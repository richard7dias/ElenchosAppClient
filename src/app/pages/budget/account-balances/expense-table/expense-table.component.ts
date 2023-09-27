import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SourceExpense } from 'src/app/core/interfaces/sourceExpense.interface';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { NewExpenseModalComponent } from './new-expense-modal/new-expense-modal.component';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';
import { DeleteExpenseModalComponent } from './delete-expense-modal/delete-expense-modal.component';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';

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
    private _dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      if (expenses) {
        this.internalExpenses = expenses;
      } else {
        this.callApiSourceExpenses();
      }
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalExpenses;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  callApiSourceExpenses(): void {
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpenses.setInternalExpenses(response.body);
        }
      }
    );
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