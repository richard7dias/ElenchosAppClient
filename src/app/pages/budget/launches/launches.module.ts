import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

import { LaunchesComponent } from './launches.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { EntriesComponent } from './entries/entries.component';
import { ExpenseLaunchesTableComponent } from './expenses/expense-launches-table/expense-launches-table.component';
import { EditLaunchModalComponent } from './expenses/edit-launch-modal/edit-launch-modal.component';
import { DeleteLaunchModalComponent } from './expenses/delete-launch-modal/delete-launch-modal.component';

@NgModule({
  declarations: [
    LaunchesComponent,
    ExpensesComponent,
    EntriesComponent,
    ExpenseLaunchesTableComponent,
    EditLaunchModalComponent,
    DeleteLaunchModalComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    RouterModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ]
})
export class LaunchesModule { }
