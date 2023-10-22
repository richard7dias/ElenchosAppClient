import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiAnnualCategoriesService } from 'src/app/core/api/annual-categories/api-annual-categories.service';
import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';

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
    private _internalAnnualCategories: InternalAnnualCategoriesService
  ) { }

  deleteCategory() {
    this._loadingBar.setLoadingBar(true);
    this._apiAnnualCategories.deleteAnnualCategory(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateAnnualCategories();
        this._loadingBar.setLoadingBar(false);
      },
      (response) => {
        this._alert.openSnackBar(response.error.message);
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
}
