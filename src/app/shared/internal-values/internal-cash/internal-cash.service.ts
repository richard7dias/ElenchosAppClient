import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

import { NumberService } from '../../formatting/number/number.service';
import { InternalBalancesService } from '../internal-balances/internal-balances.service';
import { InternalExpensesService } from '../internal-expenses/internal-expenses.service';
import { Balance } from 'src/app/core/interfaces/balance.interface';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpense.interface';
import { InternalMonthlyCalculationsService } from '../internal-monthly-calculations/internal-monthly-calculations.service';
import { InternalLaunchesService } from '../internal-launches/internal-launches.service';
import { InternalCategoriesService } from '../internal-categories/internal-categories.service';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { HttpResponse } from '@angular/common/http';
import { Category } from 'src/app/core/interfaces/category.interface';
import { Launch } from 'src/app/core/interfaces/launch.interface';


@Injectable({
  providedIn: 'root'
})
export class InternalCashService {

  private internalCash: BehaviorSubject<string> = new BehaviorSubject<string>('0,00');

  private internalBalances!: Balance[] | null;
  private internalExpenses!: SourceExpense[] | null;

  constructor(
    private _numberFormat: NumberService,
    private _internalBalances: InternalBalancesService,
    private _internalExpenses: InternalExpensesService,
    private _internalMonthlyCalculations: InternalMonthlyCalculationsService,
    private _internalLaunches: InternalLaunchesService,
    private _internalCategories: InternalCategoriesService,
    private _apiLaunches: ApiLaunchesService,
    private _apiCategories: ApiCategoriesService
  ) {
    this.subscribeBalancesAndExpenses();

    combineLatest([this._internalBalances.getInternalBalances(), this._internalExpenses.getInternalExpenses()])
      .pipe(
        map(([balances, expenses]) => ({ balances, expenses }))
      )
      .subscribe(data => {
        this.internalBalances = data.balances;
        this.internalExpenses = data.expenses;
        this.addTotal();
      });
  }

  private setInternalCash(sumTotal: number) {
    this.internalCash.next(this._numberFormat.inPortToDuo(sumTotal));
  }

  getInternalCash(): Observable<string> {
    return this.internalCash.asObservable();
  }

  private subscribeBalancesAndExpenses(): void {
    this._internalBalances.getInternalBalances().subscribe(balances => {
      this.internalBalances = balances;
    });

    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      this.internalExpenses = expenses;
    });
  }

  private addTotal(): void {

    let sumBalances: number = 0;
    let sumExpenses: number = 0;
    let sumTotal: number = 0;

    this._internalMonthlyCalculations.getInternalTotalAvailable().subscribe(total => {
      sumExpenses += total;
    });

    if (this.internalBalances && this.internalBalances.length > 0) {
      sumBalances = this.internalBalances
        .map(obj => obj.valueBalance)
        .reduce((acc, value) => acc + value, 0);
    }

    if (this.internalExpenses && this.internalExpenses.length > 0) {
      sumExpenses += this.internalExpenses
        .map(obj => obj.valueExpense)
        .reduce((acc, value) => acc + value, 0);
    }

    sumTotal = sumBalances - sumExpenses;

    this.setInternalCash(sumTotal);
  }

  private loadingValueCurrentMonth(): void {
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
}