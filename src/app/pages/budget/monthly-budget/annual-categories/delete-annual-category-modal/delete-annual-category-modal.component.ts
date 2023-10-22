import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiAnnualCategoriesService } from 'src/app/core/api/annual-categories/api-annual-categories.service';
import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalAnnualCategoriesService } from 'src/app/shared/internal-values/internal-annual-categories/internal-annual-categories.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-annual-category-modal',
  templateUrl: './delete-annual-category-modal.component.html',
  styleUrls: ['./delete-annual-category-modal.component.css']
})
export class DeleteAnnualCategoryModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteAnnualCategoryModalComponent>,
    private _loadingBar: LoadingService,
    private _apiAnnualCategories: ApiAnnualCategoriesService,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  deleteCategory() {
    this._loadingBar.setLoadingBar(true);
    this._apiAnnualCategories.deleteAnnualCategory(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateAnnualCategories();
        this.updateCategories();
        this.updateExpenses();
        this._loadingBar.setLoadingBar(false);
      },
      (response) => {
        this._alert.openSnackBar(response.message);
        this._loadingBar.setLoadingBar(false);
      }
    );

    this._modalRef.close(true);
  }

  updateAnnualCategories() {
    this._apiAnnualCategories.getAnnualCategories().subscribe(
      (response: HttpResponse<AnnualCategory[]>) => {
        if (response.body) {
          this._internalAnnualCategories.setInternalAnnualCategories(response.body);
        }
      }
    );
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

  updateExpenses() {
    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<SourceExpense[]>) => {
        if (response.body) {
          this._internalExpenses.setInternalExpenses(response.body);
        }
      }
    );
  }
}
