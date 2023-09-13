import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesTableComponent } from './balances-table/balances-table.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { AccountBalancesComponent } from './account-balances.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    BalancesTableComponent,
    ExpenseTableComponent,
    AccountBalancesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AccountBalancesModule { }
