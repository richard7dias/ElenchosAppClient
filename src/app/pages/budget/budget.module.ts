import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';

import { LaunchesComponent } from './launches/launches.component';
import { ReportsComponent } from './reports/reports.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { BudgetComponent } from './budget.component';
import { AccountBalancesModule } from './account-balances/account-balances.module';
import { MonthlyBudgetModule } from './monthly-budget/monthly-budget.module';

@NgModule({
  declarations: [
    BudgetComponent,
    LaunchesComponent,
    ReportsComponent,
    CashFlowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MonthlyBudgetModule,
    MatButtonToggleModule,
    MatDividerModule,
    AccountBalancesModule
  ]
})
export class BudgetModule { }
