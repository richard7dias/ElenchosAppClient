import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { InvestComponent } from './pages/invest/invest.component';
import { TravelBudgetComponent } from './pages/travel-budget/travel-budget.component';
import { FinancialToolsComponent } from './pages/financial-tools/financial-tools.component';
import { FuelComponent } from './pages/financial-tools/fuel/fuel.component';
import { CoinComponent } from './pages/financial-tools/coin/coin.component';
import { RuleOfThreeComponent } from './pages/financial-tools/rule-of-three/rule-of-three.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginSettingsComponent } from './pages/login-settings/login-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'travel', component: TravelBudgetComponent },
  { path: 'tools', redirectTo: 'tools/fuel', pathMatch: 'full' },
  {
    path: 'tools', component: FinancialToolsComponent,
    children: [
      { path: 'fuel', component: FuelComponent },
      { path: 'coin', component: CoinComponent },
      { path: 'rule-of-three', component: RuleOfThreeComponent }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-settings', component: LoginSettingsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
