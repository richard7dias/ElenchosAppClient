import { BehaviorSubject, Observable } from 'rxjs';
import { SourceExpense } from '../../../core/interfaces/sourceExpenses/sourceExpense.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternalExpensesService {
  private internalExpenses: BehaviorSubject<SourceExpense[] | null> = new BehaviorSubject<SourceExpense[] | null>(null);

  constructor() { }

  setInternalExpenses(internalExpenses: SourceExpense[] | null) {
    this.internalExpenses.next(internalExpenses);
  }

  getInternalExpenses(): Observable<SourceExpense[] | null> {
    return this.internalExpenses.asObservable();
  }
}
