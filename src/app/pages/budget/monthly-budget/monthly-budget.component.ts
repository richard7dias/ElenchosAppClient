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
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { Launch } from 'src/app/core/interfaces/launch.interface';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { InternalMonthlyCalculationsService } from 'src/app/shared/internal-values/internal-monthly-calculations/internal-monthly-calculations.service';

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

  totalExpense!: number;
  totalAvailable!: number;

  constructor(
    public _numberFormat: NumberService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _dialog: MatDialog,
    public _internalDate: InternalDateService,
    private _internalLaunches: InternalLaunchesService,
    private _apiLaunches: ApiLaunchesService,
    private _internalMonthlyCalculations: InternalMonthlyCalculationsService
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

    this._internalLaunches.getInternalLaunchesByCurrentMonth().subscribe(launches => {
      if (launches) {
        this.internalLaunchesMonth = launches;
      } else {
        this.callApiLaunches();
      }
    });

    this._internalMonthlyCalculations.getInternalTotalAvailable().subscribe(total => {
      this.totalAvailable = total;
    });

    this._internalMonthlyCalculations.getInternalTotalExpense().subscribe(total => {
      this.totalExpense = total;
    });
  }

  ngDoCheck() {
    this.dataSource.data = this.internalCategories;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  callApiLaunches() {
    this._apiLaunches.getLaunches().subscribe(
      (response: HttpResponse<Launch[]>) => {
        if (response.body) {
          this._internalLaunches.setInternalLaunches(response.body);
        }
      }
    );
  }

  calculateExpenseValue(categoryId: string): number {
    if (this.internalCategories && this.internalCategories.length > 0 && this.internalLaunchesMonth) {
      const filteredLaunchesByCategory: Launch[] = this.internalLaunchesMonth
        .filter(launch => launch.categoryId === categoryId);

      const sumMonthExpenses: number = filteredLaunchesByCategory
        .map(obj => obj.value)
        .reduce((acc, value) => acc + value, 0);

      return sumMonthExpenses;
    } else {
      return 0;
    }
  }

  expenseValue(categoryId: string) {
    return this._numberFormat.inPortToDuo(this.calculateExpenseValue(categoryId));
  }

  availableValue(category: Category) {
    const sumMonthAvailable: number = category.budget - this.calculateExpenseValue(category.id);
    return this._numberFormat.inPortToDuo(sumMonthAvailable);
  }

  getTotalTableFootBudget() {
    if (this.internalCategories && this.internalCategories.length > 0) {
      return this._numberFormat.inPortToDuo(this.internalCategories
        .map(obj => obj.budget)
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
