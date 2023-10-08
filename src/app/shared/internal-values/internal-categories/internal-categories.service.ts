import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from 'src/app/core/interfaces/categories/category.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalCategoriesService {
  private internalCategories: BehaviorSubject<Category[] | null> = new BehaviorSubject<Category[] | null>(null);

  constructor() { }

  setInternalCategories(internalCategories: Category[] | null) {
    this.internalCategories.next(internalCategories);
  }

  getInternalCategories(): Observable<Category[] | null> {
    return this.internalCategories.asObservable();
  }
}
