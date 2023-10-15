import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-launch-modal',
  templateUrl: './delete-launch-modal.component.html',
  styleUrls: ['./delete-launch-modal.component.css']
})
export class DeleteLaunchModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteLaunchModalComponent>,
    private _loadingBar: LoadingService,
    private _apiLaunches: ApiLaunchesService,
    private _internalLaunches: InternalLaunchesService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  deleteLaunch() {
    this._loadingBar.setLoadingBar(true);
    this._apiLaunches.deleteLaunch(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateLaunches();
        this.updateCategories();
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
    this._modalRef.close(true);
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

  updateLaunches() {
    this._apiLaunches.getLaunches().subscribe(
      (response: HttpResponse<Launch[]>) => {
        if (response.body) {
          this._internalLaunches.setInternalLaunches(response.body);
        }
      }
    );
  }
}
