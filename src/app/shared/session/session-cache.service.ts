import { Injectable } from '@angular/core';

import { InternalBalancesService } from '../internal-values/internal-balances/internal-balances.service';
import { InternalExpensesService } from '../internal-values/internal-expenses/internal-expenses.service';
import { InternalCategoriesService } from '../internal-values/internal-categories/internal-categories.service';
import { InternalAnnualCategoriesService } from '../internal-values/internal-annual-categories/internal-annual-categories.service';
import { InternalLaunchesService } from '../internal-values/internal-launches/internal-launches.service';
import { InternalEntriesService } from '../internal-values/internal-entries/internal-entries.service';
import { InternalCurrencyService } from '../internal-values/internal-currency/currency.service';
import { NegativeCategoryWarnService } from '../negative-category-warn/negative-category-warn.service';

@Injectable({
  providedIn: 'root'
})
export class SessionCacheService {

  constructor(
    private _internalBalances: InternalBalancesService,
    private _internalExpenses: InternalExpensesService,
    private _internalCategories: InternalCategoriesService,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _internalLaunches: InternalLaunchesService,
    private _internalEntries: InternalEntriesService,
    private _internalCurrency: InternalCurrencyService,
    private _negativeCategoryWarn: NegativeCategoryWarnService
  ) { }

  clearUserData(): void {
    this._internalBalances.setInternalBalances(null);
    this._internalExpenses.setInternalExpenses(null);
    this._internalCategories.setInternalCategories(null);
    this._internalAnnualCategories.setInternalAnnualCategories(null);
    this._internalLaunches.setInternalLaunches(null);
    this._internalEntries.setInternalEntries(null);
    this._internalCurrency.setInternalCurrency(null);
    this._negativeCategoryWarn.setInternalNegativeCategoryWarn(false);
  }
}
