import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AnnualCategory } from 'src/app/core/interfaces/annualCategory/annualCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalAnnualCategoriesService {
  private internalAnnualCategories: BehaviorSubject<AnnualCategory[] | null> = new BehaviorSubject<AnnualCategory[] | null>(null);

  constructor() { }

  setInternalAnnualCategories(internalAnnualCategories: AnnualCategory[] | null) {
    this.internalAnnualCategories.next(internalAnnualCategories);
  }

  getInternalAnnualCategories(): Observable<AnnualCategory[] | null> {
    return this.internalAnnualCategories.asObservable();
  }
}
