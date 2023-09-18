import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { BalancesTableComponent } from './balances-table/balances-table.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';
import { AccountBalancesComponent } from './account-balances.component';
import { EditBalanceModalComponent } from './balances-table/edit-balance-modal/edit-balance-modal.component';
import { DeleteBalanceModalComponent } from './balances-table/delete-balance-modal/delete-balance-modal.component';
import { NewBalanceModalComponent } from './balances-table/new-balance-modal/new-balance-modal.component';
import { NewExpenseModalComponent } from './expense-table/new-expense-modal/new-expense-modal.component';
import { EditExpenseModalComponent } from './expense-table/edit-expense-modal/edit-expense-modal.component';
import { DeleteExpenseModalComponent } from './expense-table/delete-expense-modal/delete-expense-modal.component';

@NgModule({
  declarations: [
    BalancesTableComponent,
    ExpenseTableComponent,
    AccountBalancesComponent,
    EditBalanceModalComponent,
    DeleteBalanceModalComponent,
    NewBalanceModalComponent,
    NewExpenseModalComponent,
    EditExpenseModalComponent,
    DeleteExpenseModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    NgFor,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule
  ]
})
export class AccountBalancesModule { }
