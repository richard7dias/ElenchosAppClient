import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { InvestComponent } from './pages/invest/invest.component';
import { TravelBudgetComponent } from './pages/travel-budget/travel-budget.component';
import { FinancialToolsComponent } from './pages/financial-tools/financial-tools.component';
import { FuelComponent } from './pages/financial-tools/fuel/fuel.component';
import { ExchangeComponent } from './pages/financial-tools/exchange/exchange.component';
import { RuleOfThreeComponent } from './pages/financial-tools/rule-of-three/rule-of-three.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginSettingsComponent } from './pages/login-settings/login-settings.component';
import { AuthGuard } from './core/auth-guard/auth-guard.service';
import { AccountBalancesComponent } from './pages/budget/account-balances/account-balances.component';
import { CashFlowComponent } from './pages/budget/cash-flow/cash-flow.component';
import { MonthlyBudgetComponent } from './pages/budget/monthly-budget/monthly-budget.component';
import { LaunchesComponent } from './pages/budget/launches/launches.component';
import { ReportsComponent } from './pages/budget/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'budget', redirectTo: 'budget/account-balances', pathMatch: 'full' },
  {
    path: 'budget', component: BudgetComponent,
    children: [
      { path: 'account-balances', component: AccountBalancesComponent },
      { path: 'cash-flow', component: CashFlowComponent },
      { path: 'monthly-budget', component: MonthlyBudgetComponent },
      { path: 'launches', component: LaunchesComponent },
      { path: 'reports', component: ReportsComponent },
    ], canActivate: [AuthGuard]
  },
  { path: 'invest', component: InvestComponent, canActivate: [AuthGuard] },
  { path: 'travel', component: TravelBudgetComponent, canActivate: [AuthGuard] },
  { path: 'tools', redirectTo: 'tools/fuel', pathMatch: 'full' },
  {
    path: 'tools', component: FinancialToolsComponent,
    children: [
      { path: 'fuel', component: FuelComponent },
      { path: 'coin', component: ExchangeComponent },
      { path: 'rule-of-three', component: RuleOfThreeComponent }
    ], canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-settings', component: LoginSettingsComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
