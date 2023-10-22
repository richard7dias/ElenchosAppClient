import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { NewCategoryModalComponent } from './new-category-modal/new-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-monthly-categories',
  templateUrl: './monthly-categories.component.html',
  styleUrls: ['./monthly-categories.component.css']
})
export class MonthlyCategoriesComponent {

  @ViewChild(MatSort) sort!: MatSort;

  internalCategories!: Category[];
  internalLaunchesMonth!: Launch[];

  displayedColumns: string[] = ['name', 'budget', 'expense', 'available', 'itens'];
  dataSource = new MatTableDataSource(this.internalCategories);

  constructor(
    public _numberFormat: NumberService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _dialog: MatDialog,
    public _internalDate: InternalDateService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this.searchCategories();
  }

  ngDoCheck() {
    this.dataSource.data = this.internalCategories;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  searchCategories() {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      } else {
        this.callApiCategories();
      }
    });
  }

  callApiCategories() {
    this._loadingBar.setLoadingBar(true);
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        if (response.body) {
          this._internalCategories.setInternalCategories(response.body);
          this.searchCategories();
          this._loadingBar.setLoadingBar(false);
        }
      }
    );
  }

  getTotalTableFootBudget(): string {
    if (this.internalCategories && this.internalCategories.length > 0) {
      return this._numberFormat.inPortToDuo(this.internalCategories
        .map(obj => obj.budget)
        .reduce((acc, value) => acc + value, 0)
      );
    } else {
      return this._numberFormat.inPortToDuo(0);
    }
  }

  getTotalTableFootExpense(): string {
    if (this.internalCategories && this.internalCategories.length > 0) {
      return this._numberFormat.inPortToDuo(this.internalCategories
        .map(obj => obj.expense ? obj.expense : 0)
        .reduce((acc, value) => acc + value, 0)
      );
    } else {
      return this._numberFormat.inPortToDuo(0);
    }
  }

  getTotalTableFootAvailable(): string {
    if (this.internalCategories && this.internalCategories.length > 0) {
      const sum: number = this.internalCategories
        .map(obj => obj.available ? obj.available : 0)
        .reduce((acc, value) => acc + value, 0);
      return this._numberFormat.inPortToDuo(sum);
    } else {
      return this._numberFormat.inPortToDuo(0);
    }
  }

  openModalNewCategory() {
    this._dialog.open(NewCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms"
    });
  }

  openModalEditCategory(category: Category) {
    this._dialog.open(EditCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: category
    });
  }

  openModalDeleteCategory(category: Category) {
    this._dialog.open(DeleteCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: category
    });
  }

  resetAvailable(category: Category) {
    let body = {
      budget: category.expense,
      available: 0
    }
    this._loadingBar.setLoadingBar(true);
    this._apiCategories.patchCategory(category.id, body).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(`Disponível de "${category.name}" foi zerado!`);
        this.callApiCategories();
        this._apiExpenses.getSourceExpenses().subscribe(
          (response: HttpResponse<any>) => {
            this._internalExpenses.setInternalExpenses(response.body);
            this._loadingBar.setLoadingBar(false);
          }
        );
      }
    );
  }
}