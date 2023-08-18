import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InvestComponent } from './invest/invest.component';
import { BudgetComponent } from './budget/budget.component';

@NgModule({
  declarations: [
    HomeComponent,
    InvestComponent,
    BudgetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
