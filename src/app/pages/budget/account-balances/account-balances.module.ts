import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { BalancesTableComponent } from './balances-table/balances-table.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { AccountBalancesComponent } from './account-balances.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BalancesTableComponent,
    ExpenseTableComponent,
    AccountBalancesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    NgFor,
    MatIconModule,
    MatButtonModule
  ]
})
export class AccountBalancesModule { }
