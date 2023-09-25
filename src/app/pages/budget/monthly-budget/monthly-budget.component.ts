import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { Category } from 'src/app/core/interfaces/category.interface';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { NewCategoryModalComponent } from './new-category-modal/new-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.css']
})
export class MonthlyBudgetComponent {

  @ViewChild(MatSort) sort!: MatSort;

  internalCategories!: Category[];

  displayedColumns: string[] = ['name', 'budget', 'expense', 'available', 'itens'];
  dataSource = new MatTableDataSource(this.internalCategories);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public _numberFormat: NumberService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        if (response.body) {
          this._internalCategories.setInternalCategories(response.body);
        }
      }
    );

    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      }
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalCategories;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getTotalTableFoot(propName: string) {
    if (this.internalCategories && this.internalCategories.length > 0) {
      return this._numberFormat.inPortToDuo(this.internalCategories
        .map(obj => {
          switch (propName) {
            case 'budget':
              return obj.budget;
            case 'expense':
              return obj.expense;
            case 'available':
              return obj.available;
            default:
              return 0;
          }
        }).reduce((acc, value) => acc + value, 0)
      );
    } else {
      return 0;
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
