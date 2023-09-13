import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';


import { MonthlyBudgetComponent } from './monthly-budget/monthly-budget.component';
import { LaunchesComponent } from './launches/launches.component';
import { ReportsComponent } from './reports/reports.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { BudgetComponent } from './budget.component';
import { AccountBalancesModule } from './account-balances/account-balances.module';

@NgModule({
  declarations: [
    BudgetComponent,
    MonthlyBudgetComponent,
    LaunchesComponent,
    ReportsComponent,
    CashFlowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule,
    MatDividerModule,
    AccountBalancesModule
  ],
  exports: [
    MatTableModule,
    MatSortModule
  ],
})
export class BudgetModule { }
