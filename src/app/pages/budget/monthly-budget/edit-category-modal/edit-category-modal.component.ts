import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.css']
})
export class EditCategoryModalComponent {

  categoryNameInput!: string;
  categoryBudgetInput!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalCategories: InternalCategoriesService,
    private _apiCategories: ApiCategoriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditCategoryModalComponent>,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this.categoryNameInput = this._data.name;
    this.categoryBudgetInput = this._data.budget;
  }

  submitForm(): void {
    if (this.categoryNameInput && this.categoryBudgetInput >= 0) {

      let categoryEdited: Category = {
        id: this._data.id,
        idOwner: this._data.idOwner,
        name: this.categoryNameInput,
        budget: this.categoryBudgetInput == null ? 0 : this.categoryBudgetInput,
        expense: this._data.expense,
        available: this.categoryBudgetInput - this._data.expense,
      }

      this._loadingBar.setLoadingBar(true);
      this._apiCategories.patchCategory(this._data.id, categoryEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateCategories();
            this._modalRef.close(true);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error.message);
        }
      );

      this._apiExpenses.getSourceExpenses().subscribe(
        (response: HttpResponse<any>) => {
          this._internalExpenses.setInternalExpenses(response.body);
        }
      );

      this._loadingBar.setLoadingBar(false);
    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }

  updateCategories() {
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        if (response.body) {
          this._internalCategories.setInternalCategories(response.body);
        }
      }
    );
  }
}
