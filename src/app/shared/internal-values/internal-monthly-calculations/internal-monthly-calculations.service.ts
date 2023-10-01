import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from 'src/app/core/interfaces/category.interface';
import { InternalCategoriesService } from '../internal-categories/internal-categories.service';
import { InternalLaunchesService } from '../internal-launches/internal-launches.service';
import { Launch } from 'src/app/core/interfaces/launch.interface';
import { NumberService } from '../../formatting/number/number.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalExpensesService } from '../internal-expenses/internal-expenses.service';

@Injectable({
  providedIn: 'root'
})
export class InternalMonthlyCalculationsService {

  internalCategories: Category[] = [];
  internalLaunchesMonth: Launch[] = [];

  private totalExpense: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalAvailable: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private _internalCategories: InternalCategoriesService,
    private _internalLaunches: InternalLaunchesService,
    public _numberFormat: NumberService,
    private _internalExpenses: InternalExpensesService,
    private _apiExpenses: ApiSourceExpenseService
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

    this._internalCategories.setInternalAvailableCurrentMonth(sumTotal);
    this.totalAvailable.next(sumTotal);
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
}
