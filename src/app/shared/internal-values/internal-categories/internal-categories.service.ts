import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Category } from 'src/app/core/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalCategoriesService {
  private internalCategories: BehaviorSubject<Category[] | null> = new BehaviorSubject<Category[] | null>(null);

  private internalAvailableCurrentMonth: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setInternalCategories(internalCategories: Category[] | null) {
    this.internalCategories.next(internalCategories);
  }

  getInternalCategories(): Observable<Category[] | null> {
    return this.internalCategories.asObservable();
  }

  setInternalAvailableCurrentMonth(internalAvailableCurrentMonth: number) {
    this.internalAvailableCurrentMonth.next(internalAvailableCurrentMonth);
  }

  getInternalAvailableCurrentMonth(): Observable<number> {
    return this.internalAvailableCurrentMonth.asObservable();
  }
}
