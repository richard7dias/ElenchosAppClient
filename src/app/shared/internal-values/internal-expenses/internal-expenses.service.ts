import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { SourceExpense } from '../../../core/interfaces/sourceExpenses/sourceExpense.interface';
import { Category } from '../../../core/interfaces/categories/category.interface';
import { Injectable } from '@angular/core';
import { InternalCategoriesService } from '../internal-categories/internal-categories.service';
import { GeneralIdsService } from '../../general-ids/general-ids.service';

@Injectable({
  providedIn: 'root'
})
export class InternalExpensesService {
  private internalExpenses: BehaviorSubject<SourceExpense[] | null> = new BehaviorSubject<SourceExpense[] | null>(null);

  constructor(
    private _internalCategories: InternalCategoriesService,
    private _generalIds: GeneralIdsService
  ) { }

  setInternalExpenses(internalExpenses: SourceExpense[] | null) {
    this.internalExpenses.next(internalExpenses);
  }

  getInternalExpenses(): Observable<SourceExpense[] | null> {
    return combineLatest([
      this.internalExpenses.asObservable(),
      this._internalCategories.getInternalCategories()
    ]).pipe(
      map(([expenses, categories]) => {
        if (!expenses) {
          return expenses;
        }

        const currentMonthAvailable: SourceExpense = {
          id: this._generalIds.currentMonthId,
          idOwner: '',
          description: 'Disponível do mês atual',
          valueExpense: this.getCurrentMonthAvailableTotal(categories)
        };

        return [currentMonthAvailable, ...expenses];
      })
    );
  }

  private getCurrentMonthAvailableTotal(categories: Category[] | null): number {
    if (!categories || categories.length === 0) {
      return 0;
    }

    return categories
      .map(category => category.available)
      .reduce((acc, value) => acc + value, 0);
  }
}
