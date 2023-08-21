import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestComponent } from './invest/invest.component';
import { BudgetComponent } from './budget/budget.component';
import { TravelBudgetComponent } from './travel-budget/travel-budget.component';
import { FinancialToolsModule } from './financial-tools/financial-tools.module';

@NgModule({
  declarations: [
    DashboardComponent,
    InvestComponent,
    BudgetComponent,
    TravelBudgetComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    FinancialToolsModule
  ]
})
export class PagesModule { }
