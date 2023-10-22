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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { MonthlyBudgetComponent } from './monthly-budget.component';
import { NewCategoryModalComponent } from './monthly-categories/new-category-modal/new-category-modal.component';
import { EditCategoryModalComponent } from './monthly-categories/edit-category-modal/edit-category-modal.component';
import { DeleteCategoryModalComponent } from './monthly-categories/delete-category-modal/delete-category-modal.component';
import { MonthlyCategoriesComponent } from './monthly-categories/monthly-categories.component';
import { AnnualCategoriesComponent } from './annual-categories/annual-categories.component';
import { DeleteAnnualCategoryModalComponent } from './annual-categories/delete-annual-category-modal/delete-annual-category-modal.component';
import { EditAnnualCategoryModalComponent } from './annual-categories/edit-annual-category-modal/edit-annual-category-modal.component';
import { NewAnnualCategoryModalComponent } from './annual-categories/new-annual-category-modal/new-annual-category-modal.component';

@NgModule({
  declarations: [
    MonthlyBudgetComponent,
    NewCategoryModalComponent,
    EditCategoryModalComponent,
    DeleteCategoryModalComponent,
    MonthlyCategoriesComponent,
    AnnualCategoriesComponent,
    DeleteAnnualCategoryModalComponent,
    EditAnnualCategoryModalComponent,
    NewAnnualCategoryModalComponent
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
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class MonthlyBudgetModule { }
