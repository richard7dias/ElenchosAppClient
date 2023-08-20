import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestComponent } from './invest/invest.component';
import { BudgetComponent } from './budget/budget.component';
import { TravelBudgetComponent } from './travel-budget/travel-budget.component';
import { FinancialToolsComponent } from './financial-tools/financial-tools.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InvestComponent,
    BudgetComponent,
    TravelBudgetComponent,
    FinancialToolsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class PagesModule { }
