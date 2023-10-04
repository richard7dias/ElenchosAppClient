import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MonthlyBudgetComponent } from './monthly-budget.component';
import { NewCategoryModalComponent } from './new-category-modal/new-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';

@NgModule({
  declarations: [
    MonthlyBudgetComponent,
    NewCategoryModalComponent,
    EditCategoryModalComponent,
    DeleteCategoryModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})
export class MonthlyBudgetModule { }
