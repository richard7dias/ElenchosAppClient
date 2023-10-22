import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiCategoriesService } from 'src/app/core/api/categories/api-categories.service';
import { InternalCategoriesService } from '../internal-values/internal-categories/internal-categories.service';
import { LoadingService } from '../loading/loading.service';
import { Category } from 'src/app/core/interfaces/categories/category.interface';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NegativeCategoryWarnService {

  private negativeCategoryWarn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private internalCategories!: Category[];

  constructor(
    private _apiCategories: ApiCategoriesService,
    private _internalCategories: InternalCategoriesService,
    private _loadingBar: LoadingService,
  ) {
    this.searchInternalCategories();
  }

  private searchInternalCategories() {
    this._internalCategories.getInternalCategories().subscribe(categories => {
      if (categories) {
        this.internalCategories = categories;
        this.checkNegativeCategory();
      } else {
        this.callApiCategories();
      }
    });
  }

  private callApiCategories() {
    this._loadingBar.setLoadingBar(true);
    this._apiCategories.getCategories().subscribe(
      (response: HttpResponse<Category[]>) => {
        this._internalCategories.setInternalCategories(response.body);
        this.searchInternalCategories();
        this._loadingBar.setLoadingBar(false);
      }
    );
  }

  checkNegativeCategory() {
    const hasNegative: boolean = !!this.internalCategories.find(category => category.available < 0);

    if (hasNegative) {
      this.setInternalNegativeCategoryWarn(true);
    } else {
      this.setInternalNegativeCategoryWarn(false);
    }
  }

  getInternalNegativeCategoryWarn(): Observable<boolean> {
    return this.negativeCategoryWarn.asObservable();
  }

  setInternalNegativeCategoryWarn(alert: boolean): void {
    this.negativeCategoryWarn.next(alert);
  }
}
