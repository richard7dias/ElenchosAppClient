import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestComponent } from './invest/invest.component';
import { BudgetComponent } from './budget/budget.component';
import { TravelBudgetComponent } from './travel-budget/travel-budget.component';
import { FinancialToolsModule } from './financial-tools/financial-tools.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginSettingsComponent } from './login-settings/login-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InvestComponent,
    BudgetComponent,
    TravelBudgetComponent,
    LoginComponent,
    SignupComponent,
    LoginSettingsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    FinancialToolsModule,
    MatStepperModule
  ]
})
export class PagesModule { }
