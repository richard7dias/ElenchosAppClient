import { Component } from '@angular/core';

import { InternalRouteService } from 'src/app/shared/internal-values/internal-route/internal-route.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  accountBalancesChecked: boolean = false;
  monthlyBudgetChecked: boolean = false;
  launchesChecked: boolean = false;
  reportsChecked: boolean = false;
  cashFlowChecked: boolean = false;

  constructor(private _internalRoute: InternalRouteService) {
    this._internalRoute.getLastChildCurrentRoute().subscribe(route => {
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

  removeChecked() {
    this.accountBalancesChecked = false;
    this.monthlyBudgetChecked = false;
    this.launchesChecked = false;
    this.reportsChecked = false;
    this.cashFlowChecked = false;
  }
}
