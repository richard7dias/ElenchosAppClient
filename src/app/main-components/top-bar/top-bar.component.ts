import { Router } from '@angular/router';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';
import { Component, OnInit } from '@angular/core';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalAnnualCategoriesService } from 'src/app/shared/internal-values/internal-annual-categories/internal-annual-categories.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { NegativeCategoryWarnService } from 'src/app/shared/negative-category-warn/negative-category-warn.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  userName?: string;
  internalCash!: number;
  alert: boolean = false;

  constructor(
    private _internalUser: InternalUserService,
    private _internalCash: InternalCashService,
    private _router: Router,
    private _apiBalances: ApiBalancesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalBalances: InternalBalancesService,
    private _internalExpenses: InternalExpensesService,
    private _internalCategories: InternalCategoriesService,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _internalLaunches: InternalLaunchesService,
    private _internalEntries: InternalEntriesService,
    private _internalCurrency: InternalCurrencyService,
    private _loadingBar: LoadingService,
    public _numberFormat: NumberService,
    private _negativeCategoryWarn: NegativeCategoryWarnService
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().subscribe(user => {
      this.userName = user?.firstName;
      if (user) {
        this.cashCalculate();
      }
    });

    this._internalCash.getInternalCash().subscribe(cash => {
      this.internalCash = cash;
    });

    this._negativeCategoryWarn.getInternalNegativeCategoryWarn().subscribe(value => {
      this.alert = value;
    });

  }

  cashCalculate(): void {
    this._internalBalances.getInternalBalances().subscribe(balances => {
      if (!balances) {
        this.callApiBalances();
      }
    });

    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      if (!expenses) {
        this.callApiExpenses();
      }
    });
  }

  callApiBalances(): void {
    this._loadingBar.setLoadingBar(true);
    this._apiBalances.getBalances().subscribe(
      (response: HttpResponse<any>) => {
        this._internalBalances.setInternalBalances(response.body);
        this._loadingBar.setLoadingBar(false);
      }
    );
  }

  callApiExpenses(): void {
    this._loadingBar.setLoadingBar(true);
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<any>) => {
        this._internalExpenses.setInternalExpenses(response.body);
        this._loadingBar.setLoadingBar(false);
      }
    );
  }

  logout() {
    this._internalUser.setInternalUser(null);

    this._internalBalances.setInternalBalances(null);
    this._internalExpenses.setInternalExpenses(null);
    this._internalCategories.setInternalCategories(null);
    this._internalAnnualCategories.setInternalAnnualCategories(null);
    this._internalLaunches.setInternalLaunches(null);
    this._internalEntries.setInternalEntries(null);
    this._internalCurrency.setInternalCurrency(null);
    this._negativeCategoryWarn.setInternalNegativeCategoryWarn(false);

    this._router.navigate(['/login']);
    localStorage.removeItem('authToken');
  }
}