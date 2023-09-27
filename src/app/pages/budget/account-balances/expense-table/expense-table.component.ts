import { AfterViewInit, Component, ViewChild } from '@angular/core';

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
import { HttpResponse } from '@angular/common/http';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalMonthlyCalculationsService } from 'src/app/shared/internal-values/internal-monthly-calculations/internal-monthly-calculations.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Launch } from 'src/app/core/interfaces/launch.interface';

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
  currentMonth: SourceExpense = {
    id: '',
    idOwner: '',
    description: `Mes atual (${this._internalDate.getCurrentMonthName()})`,
    valueExpense: 0,
  }

  constructor(
    public _numberFormat: NumberService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService,
    private _dialog: MatDialog,
    private _internalDate: InternalDateService,
    private _internalMonthlyCalculations: InternalMonthlyCalculationsService,
    private _internalLaunches: InternalLaunchesService,
    private _internalCategories: InternalCategoriesService,
    private _apiLaunches: ApiLaunchesService,
    private _apiCategories: ApiCategoriesService
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

    this._internalMonthlyCalculations.getInternalTotalAvailable().subscribe(total => {
      this.currentMonth.valueExpense = total;
    });
    this.loadingValueCurrentMonth();
  }

  ngDoCheck() {
    this.dataSource.data = [...this.internalExpenses, this.currentMonth];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  callApiSourceExpenses(): void {
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpenses.setInternalExpenses([...response.body, this.currentMonth]);
        }
      }
    );
  }

  loadingValueCurrentMonth(): void {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (!categories) {
        this._apiCategories.getCategories().subscribe(
          (categoriesApi: HttpResponse<Category[]>) => {
            this._internalCategories.setInternalCategories(categoriesApi.body);
          }
        );
      }
    });

    this._internalLaunches.getInternalLaunches().subscribe(launches => {
      if (!launches) {
        this._apiLaunches.getLaunches().subscribe(
          (launchesApi: HttpResponse<Launch[]>) => {
            this._internalLaunches.setInternalLaunches(launchesApi.body);
          }
        );
      }
    });
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