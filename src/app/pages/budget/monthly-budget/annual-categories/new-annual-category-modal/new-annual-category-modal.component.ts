import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiAnnualCategoriesService } from 'src/app/core/api/annual-categories/api-annual-categories.service';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { MonthNames } from 'src/app/core/interfaces/monthNames/monthNames.interface';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalAnnualCategoriesService } from 'src/app/shared/internal-values/internal-annual-categories/internal-annual-categories.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';


@Component({
  selector: 'app-new-annual-category-modal',
  templateUrl: './new-annual-category-modal.component.html',
  styleUrls: ['./new-annual-category-modal.component.css']
})
export class NewAnnualCategoryModalComponent {

  internalUser!: User;
  categoryDescriptionInput!: string;
  categoryValueInput!: number;
  categoryAutomaticDebitInput: boolean = false;
  categoryMonthOfPaymentInput!: number;
  monthNames!: MonthNames[];

  constructor(
    private _apiAnnualCategories: ApiAnnualCategoriesService,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _internalUser: InternalUserService,
    private _modalRef: MatDialogRef<NewAnnualCategoryModalComponent>,
    private _internalDate: InternalDateService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this.createMonthNames();

    this._internalUser.getInternalUser().subscribe(internalUser => {
      if (internalUser) {
        this.internalUser = internalUser;
      }
    });
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
      let newAnnualCategory: AnnualCategory = {
        id: 'Feito na API',
        idOwner: this.internalUser.id,
        description: this.categoryDescriptionInput,
        value: this.categoryValueInput,
        automaticDebit: this.categoryAutomaticDebitInput,
        monthOfPayment: this.categoryMonthOfPaymentInput,
      }

      this._loadingBar.setLoadingBar(true);
      this._apiAnnualCategories.postAnnualCategory(newAnnualCategory).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this.updateAnnualCategories();
            this.updateCategories();
            this.updateExpenses();
            this._modalRef.close(true);
            this._loadingBar.setLoadingBar(false);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error);
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
