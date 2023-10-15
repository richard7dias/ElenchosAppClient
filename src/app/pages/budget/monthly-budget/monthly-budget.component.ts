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

@Component({
  selector: 'app-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.css']
})
export class MonthlyBudgetComponent {

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
    private _loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this._loadingBar.setLoadingBar(true);
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      } else {
        this._apiCategories.getCategories().subscribe(
          (response: HttpResponse<Category[]>) => {
            if (response.body) {
              this._internalCategories.setInternalCategories(response.body);
              this.internalCategories = response.body;
            }
          }
        );
      }
    });
    this._loadingBar.setLoadingBar(false);
  }

  ngDoCheck() {
    this.dataSource.data = this.internalCategories;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
      return this._numberFormat.inPortToDuo(this.internalCategories
        .map(obj => obj.available ? obj.available : 0)
        .reduce((acc, value) => acc + value, 0)
      );
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
}
