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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
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
