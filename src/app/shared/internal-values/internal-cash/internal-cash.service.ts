import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NumberService } from '../../formatting/number.service';


@Injectable({
  providedIn: 'root'
})
export class InternalCashService {

  private internalCash: BehaviorSubject<string> = new BehaviorSubject<string>('0,00');

  constructor(
    private _numberFormat: NumberService
  ) { }

  setInternalCash(sumTotal: number) {
    this.internalCash.next(this._numberFormat.inPortToDuo(sumTotal));
  }

  getInternalCash(): Observable<string> {
    return this.internalCash.asObservable();
  }
}