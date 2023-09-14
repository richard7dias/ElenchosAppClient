import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Balance } from 'src/app/core/interfaces/balance.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalBalancesService {
  private internalBalances: BehaviorSubject<Balance[] | null> = new BehaviorSubject<Balance[] | null>(null);

  constructor() { }

  setInternalBalances(internalBalances: Balance[] | null) {
    this.internalBalances.next(internalBalances);
  }

  getInternalBalances(): Observable<Balance[] | null> {
    return this.internalBalances.asObservable();
  }
}
