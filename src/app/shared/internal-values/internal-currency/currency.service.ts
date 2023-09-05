import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currency } from '../../../core/interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalCurrencyService {

  private internalCurrency: BehaviorSubject<Currency[] | null> = new BehaviorSubject<Currency[] | null>(null);

  constructor() { }

  setInternalCurrency(internalCurrency: Currency[]) {
    this.internalCurrency.next(internalCurrency);
  }

  getInternalCurrency(): Observable<Currency[] | null> {
    return this.internalCurrency.asObservable();
  }
}
