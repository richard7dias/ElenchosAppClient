import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from 'src/app/core/interfaces/category.interface';
import { InternalCategoriesService } from '../internal-categories/internal-categories.service';
import { InternalLaunchesService } from '../internal-launches/internal-launches.service';
import { Launch } from 'src/app/core/interfaces/launch.interface';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalExpensesService } from '../internal-expenses/internal-expenses.service';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpense.interface';
import { GeneralIdsService } from '../../general-ids/general-ids.service';

@Injectable({
  providedIn: 'root'
})
export class InternalMonthlyCalculationsService {

  private internalCategories: Category[] = [];
  private internalLaunchesMonth: Launch[] = [];

  private totalExpense: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalAvailable: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private negativeCategoryWarn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _internalCategories: InternalCategoriesService,
    private _internalLaunches: InternalLaunchesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService,
    public _generalIds: GeneralIdsService
  ) { }

  private subscribeInternalCategories(): void {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
        this.setTotalExpense();
        this.setTotalAvailable();
      }
    });
  }

  private subscribeInternalLaunchesByCurrentMonth(): void {
    this._internalLaunches.getInternalLaunchesByCurrentMonth().subscribe(launches => {
      if (launches) {
        this.internalLaunchesMonth = launches;
        this.setTotalExpense();
        this.setTotalAvailable();
      }
    });
  }

  private calculateExpenseValue(categoryId: string): number {
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

  private setTotalExpense(): void {
    let sumTotal: number = 0
    if (this.internalCategories) {
      this.internalCategories.forEach(category => {
        sumTotal += this.calculateExpenseValue(category.id);
      });
    }
    this.totalExpense.next(sumTotal);
  }

  private setTotalAvailable(): void {
    let sumTotal: number = 0
    if (this.internalCategories) {
      this.internalCategories.forEach(category => {
        sumTotal += category.budget - this.calculateExpenseValue(category.id);
      });
    }

    this.setInternalTotalAvailable(sumTotal);
  }

  private setInternalTotalAvailable(totalAvailable: number) {
    this.totalAvailable.next(totalAvailable);
    let sourceExpenses!: SourceExpense[];
    let index;

    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      if (expenses) {
        sourceExpenses = expenses;
        index = sourceExpenses.findIndex(expense => expense.id === this._generalIds.currentMonthId);
      }
    });

    if (index && sourceExpenses[index].valueExpense !== totalAvailable) {
      sourceExpenses[index].valueExpense = totalAvailable;
      this._apiExpenses.patchSourceExpense(this._generalIds.currentMonthId, { valueExpense: totalAvailable }).subscribe();
      this._internalExpenses.setInternalExpenses(sourceExpenses);
    }
  }

  getInternalTotalExpense(): Observable<number> {
    this.subscribeInternalCategories();
    this.subscribeInternalLaunchesByCurrentMonth();
    return this.totalExpense.asObservable();
  }

  getInternalTotalAvailable(): Observable<number> {
    this.subscribeInternalCategories();
    this.subscribeInternalLaunchesByCurrentMonth();
    return this.totalAvailable.asObservable();
  }

  getInternalNegativeCategoryWarn(): Observable<boolean> {
    return this.negativeCategoryWarn.asObservable();
  }

  setInternalNegativeCategoryWarn(alert: boolean): void {
    this.negativeCategoryWarn.next(alert);
  }
}
