import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { ReportsComponent } from './reports/reports.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { BudgetComponent } from './budget.component';
import { AccountBalancesModule } from './account-balances/account-balances.module';
import { MonthlyBudgetModule } from './monthly-budget/monthly-budget.module';
import { LaunchesModule } from './launches/launches.module';

@NgModule({
  declarations: [
    BudgetComponent,
    ReportsComponent,
    CashFlowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MonthlyBudgetModule,
    MatButtonModule,
    MatTabsModule,
    AccountBalancesModule,
    LaunchesModule,
    MatDividerModule,
    MatBadgeModule
  ]
})
export class BudgetModule { }
