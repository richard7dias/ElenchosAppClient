import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrls: ['./new-category-modal.component.css']
})
export class NewCategoryModalComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  internalUser!: User;
  internalCategories!: Category[];

  newCategoryName!: string;
  newCategoryBudget!: number;

  constructor(
    private _internalCategories: InternalCategoriesService,
    private _apiCategories: ApiCategoriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _internalUser: InternalUserService,
    private _modalRef: MatDialogRef<NewCategoryModalComponent>,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().pipe(takeUntil(this._destroy$)).subscribe(internalUser => {
      if (internalUser) {
        this.internalUser = internalUser;
      }
    });

    this._internalCategories.getInternalCategories().pipe(takeUntil(this._destroy$)).subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      }
    }
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  submitForm(): void {
    if (this.newCategoryName && this.newCategoryBudget >= 0) {
      let newCategory: Category = {
        id: 'Feito na API',
        idOwner: this.internalUser.id,
        name: this.newCategoryName,
        budget: this.newCategoryBudget == null ? 0 : this.newCategoryBudget,
        expense: 0,
        available: this.newCategoryBudget == null ? 0 : this.newCategoryBudget
      }

      this._loadingBar.setLoadingBar(true);
      this._apiCategories.postCategory(newCategory).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this._modalRef.close(true);

            this._apiCategories.getCategories().subscribe(
              (categoriesResponse: HttpResponse<Category[]>) => {
                this._internalCategories.setInternalCategories(categoriesResponse.body);
                this._loadingBar.setLoadingBar(false);
              }
            );

            this._apiExpenses.getSourceExpenses().subscribe(
              (expensesResponse: HttpResponse<any>) => {
                this._internalExpenses.setInternalExpenses(expensesResponse.body);
                this._loadingBar.setLoadingBar(false);
              }
            );
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
}
