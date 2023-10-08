import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { NewExpenseModalComponent } from './new-expense-modal/new-expense-modal.component';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';
import { DeleteExpenseModalComponent } from './delete-expense-modal/delete-expense-modal.component';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { GeneralIdsService } from 'src/app/shared/general-ids/general-ids.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  internalExpenses: SourceExpense[] = [];

  displayedColumns: string[] = ['description', 'valueExpense', 'itens'];
  dataSource = new MatTableDataSource(this.internalExpenses);

  constructor(
    public _numberFormat: NumberService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService,
    private _dialog: MatDialog,
    private _loadingBar: LoadingService,
    public _generalIds: GeneralIdsService
  ) { }

  ngOnInit() {
    this.subscribeInternalExpenses();
    console.log(this._generalIds.currentMonthId)
  }

  ngDoCheck() {
    this.dataSource.data = this.internalExpenses;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private subscribeInternalExpenses(): void {
    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      if (expenses) {
        this.internalExpenses = expenses;
      } else {
        this.callApiSourceExpenses();
      }
    });
  }

  private callApiSourceExpenses(): void {
    this._loadingBar.setLoadingBar(true);
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpenses.setInternalExpenses(response.body);
          this.subscribeInternalExpenses();
        }
      }
    );
    this._loadingBar.setLoadingBar(false);
  }

  getTotalValue() {
    if (this.dataSource.data && this.dataSource.data.length > 0) {
      return this._numberFormat.inPortToDuo(this.dataSource.data
        .map(obj => obj.valueExpense)
        .reduce((acc, value) => acc + value, 0)
      );
    } else {
      return 0;
    }
  }

  openModalNewExpense() {
    this._dialog.open(NewExpenseModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalEditExpense(expense: SourceExpense) {
    this._dialog.open(EditExpenseModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: expense
    });
  }

  openModalDeleteExpense(expense: SourceExpense) {
    this._dialog.open(DeleteExpenseModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: expense
    });
  }
}