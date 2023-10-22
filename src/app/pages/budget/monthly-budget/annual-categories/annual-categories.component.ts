import { Component, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { NewAnnualCategoryModalComponent } from './new-annual-category-modal/new-annual-category-modal.component';
import { EditAnnualCategoryModalComponent } from './edit-annual-category-modal/edit-annual-category-modal.component';
import { DeleteAnnualCategoryModalComponent } from './delete-annual-category-modal/delete-annual-category-modal.component';
import { InternalDateService } from 'src/app/shared/internal-values/internal-date/internal-date.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';
import { ApiAnnualCategoriesService } from 'src/app/core/api/annual-categories/api-annual-categories.service';
import { InternalAnnualCategoriesService } from 'src/app/shared/internal-values/internal-annual-categories/internal-annual-categories.service';

@Component({
  selector: 'app-annual-categories',
  templateUrl: './annual-categories.component.html',
  styleUrls: ['./annual-categories.component.css']
})
export class AnnualCategoriesComponent {

  @ViewChild(MatSort) sort!: MatSort;

  internalAnnualCategories!: AnnualCategory[];

  displayedColumns: string[] = ['description', 'value', 'automaticDebit', 'monthOfPayment', 'itens'];
  dataSource = new MatTableDataSource(this.internalAnnualCategories);

  constructor(
    public _numberFormat: NumberService,
    private _apiAnnualCategories: ApiAnnualCategoriesService,
    private _internalAnnualCategories: InternalAnnualCategoriesService,
    private _dialog: MatDialog,
    public _internalDate: InternalDateService,
    private _loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this.searchAnnualCategories();
  }

  ngDoCheck() {
    this.dataSource.data = this.internalAnnualCategories;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  searchAnnualCategories() {
    this._internalAnnualCategories.getInternalAnnualCategories().subscribe(categories => {
      if (categories) {
        this.internalAnnualCategories = categories;
      } else {
        this.callApiAnnualCategories();
      }
    });
  }

  callApiAnnualCategories() {
    this._loadingBar.setLoadingBar(true);
    this._apiAnnualCategories.getAnnualCategories().subscribe(
      (response: HttpResponse<AnnualCategory[]>) => {
        if (response.body) {
          this._internalAnnualCategories.setInternalAnnualCategories(response.body);
          this.searchAnnualCategories();
          this._loadingBar.setLoadingBar(false);
        }
      }
    );
  }

  openModalNewCategory() {
    this._dialog.open(NewAnnualCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms"
    });
  }

  openModalEditCategory(category: AnnualCategory) {
    this._dialog.open(EditAnnualCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: category
    });
  }

  openModalDeleteCategory(category: AnnualCategory) {
    this._dialog.open(DeleteAnnualCategoryModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: category
    });
  }
}