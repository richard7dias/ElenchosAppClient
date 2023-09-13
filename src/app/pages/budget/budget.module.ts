import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountBalancesComponent } from './account-balances/account-balances.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccountBalancesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BudgetModule { }
