import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { Category } from 'src/app/core/interfaces/category.interface';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCategoriesService } from 'src/app/shared/internal-values/internal-categories/internal-categories.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.css']
})
export class DeleteCategoryModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteCategoryModalComponent>,
    private _loadingBar: LoadingService,
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService
  ) { }

  deleteCategory() {
    this._loadingBar.setLoadingBar(true);
    this._apiCategories.deleteCategory(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateCategories();
      },
      (response) => {
        this._alert.openSnackBar(response.error.message);
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
}
