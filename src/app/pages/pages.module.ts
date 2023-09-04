import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestComponent } from './invest/invest.component';
import { BudgetComponent } from './budget/budget.component';
import { TravelBudgetComponent } from './travel-budget/travel-budget.component';
import { FinancialToolsModule } from './financial-tools/financial-tools.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginSettingsComponent } from './login-settings/login-settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmWindowComponent } from './login-settings/confirm-window/confirm-window.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InvestComponent,
    BudgetComponent,
    TravelBudgetComponent,
    LoginComponent,
    SignupComponent,
    LoginSettingsComponent,
    ConfirmWindowComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    FinancialToolsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule,
    MatDividerModule,
    AppRoutingModule,
    MatDialogModule
  ]
})
export class PagesModule { }
