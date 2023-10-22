import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiAnnualCategoriesService } from 'src/app/core/api/annual-categories/api-annual-categories.service';

import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';
import { MonthNames } from 'src/app/core/interfaces/monthNames/monthNames.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalAnnualCategoriesService } from 'src/app/shared/internal-values/internal-annual-categories/internal-annual-categories.service';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';

@Component({
  selector: 'app-edit-annual-category-modal',
  templateUrl: './edit-annual-category-modal.component.html',
  styleUrls: ['./edit-annual-category-modal.component.css']
})
export class EditAnnualCategoryModalComponent {

  categoryDescriptionInput!: string;
  categoryValueInput!: number;
  categoryAutomaticDebitInput!: boolean;
  categoryMonthOfPaymentInput!: number;

  monthNames!: MonthNames[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _apiAnnualCategories: ApiAnnualCategoriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditAnnualCategoryModalComponent>,
    private _internalDate: InternalDateService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this.createMonthNames();

    this.categoryDescriptionInput = this._data.description;
    this.categoryValueInput = this._data.value;
    this.categoryAutomaticDebitInput = this._data.automaticDebit;
    this.categoryMonthOfPaymentInput = this._data.monthOfPayment;
  }

  createMonthNames(): void {
    let newMonthNamesArray: MonthNames[] = [];
    let value = 1;

    this._internalDate.getMonthNames().forEach(monthName => {
      let monthArray = {
        monthName: monthName,
        monthValue: value
      };

      value += 1;

      newMonthNamesArray.push(monthArray);
    });

    this.monthNames = newMonthNamesArray;
  }

  submitForm(): void {
    if (this.categoryDescriptionInput &&
      this.categoryValueInput > 0 &&
      this.categoryMonthOfPaymentInput
    ) {

      let categoryEdited: AnnualCategory = {
        id: this._data.id,
        idOwner: this._data.idOwner,
        description: this.categoryDescriptionInput,
        value: this.categoryValueInput,
        automaticDebit: this.categoryAutomaticDebitInput,
        monthOfPayment: this.categoryMonthOfPaymentInput,
      }

      this._loadingBar.setLoadingBar(true);
      this._apiAnnualCategories.patchAnnualCategory(this._data.id, categoryEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateAnnualCategories();
            this.updateCategories();
            this.updateExpenses();
            this._modalRef.close(true);
            this._loadingBar.setLoadingBar(false);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error.message);
          this._loadingBar.setLoadingBar(false);
        }
      );

    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
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
