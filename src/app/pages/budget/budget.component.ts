import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InternalRouteService } from 'src/app/shared/internal-values/internal-route/internal-route.service';
import { NegativeCategoryWarnService } from 'src/app/shared/negative-category-warn/negative-category-warn.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  accountBalancesChecked: boolean = false;
  monthlyBudgetChecked: boolean = false;
  launchesChecked: boolean = false;
  reportsChecked: boolean = false;
  cashFlowChecked: boolean = false;
  alert: boolean = false;

  constructor(
    private _internalRoute: InternalRouteService,
    private _negativeCategoryWarn: NegativeCategoryWarnService
  ) {
    this._internalRoute.getCustomRoute(2).pipe(takeUntil(this._destroy$)).subscribe(route => {
      this.removeChecked();
      switch (route) {
        case 'account-balances':
          this.accountBalancesChecked = true;
          break;
        case 'monthly-budget':
          this.monthlyBudgetChecked = true;
          break;
        case 'launches':
          this.launchesChecked = true;
          break;
        case 'reports':
          this.reportsChecked = true;
          break;
        case 'cash-flow':
          this.cashFlowChecked = true;
          break;
      }
    });
  }

  ngOnInit() {
    this._negativeCategoryWarn.getInternalNegativeCategoryWarn().pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.alert = value;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  removeChecked() {
    this.accountBalancesChecked = false;
    this.monthlyBudgetChecked = false;
    this.launchesChecked = false;
    this.reportsChecked = false;
    this.cashFlowChecked = false;
  }
}
