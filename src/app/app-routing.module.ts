import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { InvestComponent } from './pages/invest/invest.component';
import { TravelBudgetComponent } from './pages/travel-budget/travel-budget.component';
import { FinancialToolsComponent } from './pages/financial-tools/financial-tools.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'invest', component: InvestComponent },
  { path: 'travel', component: TravelBudgetComponent },
  { path: 'tools', component: FinancialToolsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
