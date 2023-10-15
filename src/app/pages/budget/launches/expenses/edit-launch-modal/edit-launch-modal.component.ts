import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';

import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { DateService } from 'src/app/shared/formatting/date/date.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-launch-modal',
  templateUrl: './edit-launch-modal.component.html',
  styleUrls: ['./edit-launch-modal.component.css']
})
export class EditLaunchModalComponent {

  internalCategories!: Category[];

  dateInput!: string;
  descriptionInput!: string;
  categoryInput!: string;
  valueInput!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalLaunches: InternalLaunchesService,
    private _apiLaunches: ApiLaunchesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditLaunchModalComponent>,
    private _internalCategories: InternalCategoriesService,
    private _apiCategories: ApiCategoriesService,
    private _dateFormat: DateService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalExpenses: InternalExpensesService
  ) { }

  ngOnInit() {
    this.searchInternalCategories();
    this.dateInput = this._dateFormat.stringToDate(this._data.date).toISOString();
    this.descriptionInput = this._data.description;
    this.categoryInput = this._data.categoryName;
    this.valueInput = this._data.value;
  }

  searchInternalCategories() {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
      } else {
        this.callApiCategories();
      }
    });
  }

  callApiCategories() {
    this._loadingBar.setLoadingBar(true);
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        this._internalCategories.setInternalCategories(response.body);
        this.searchInternalCategories();
      }
    );
    this._loadingBar.setLoadingBar(false);
  }

  submitForm(): void {
    if (this.dateInput && this.descriptionInput && this.categoryInput && this.valueInput) {

      let launchEdited: Launch = {
        idOwner: this._data.idOwner,
        id: this._data.id,
        date: this.dateInput,
        description: this.descriptionInput,
        categoryName: this.categoryInput,
        categoryId: this._data.categoryId,
        value: this.valueInput
      }

      let newCategoryChanged = this.internalCategories.find(category => {
        return category.name === this.categoryInput;
      });

      if (newCategoryChanged) {
        launchEdited.categoryId = newCategoryChanged.id;
      }

      this._loadingBar.setLoadingBar(true);
      this._apiLaunches.patchLaunch(this._data.id, launchEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateLaunches();
            this.callApiCategories();
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
