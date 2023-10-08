import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { InternalBalancesService } from '../internal-balances/internal-balances.service';
import { InternalExpensesService } from '../internal-expenses/internal-expenses.service';
import { Balance } from 'src/app/core/interfaces/balances/balance.interface';
import { SourceExpense } from 'src/app/core/interfaces/sourceExpenses/sourceExpense.interface';


@Injectable({
  providedIn: 'root'
})
export class InternalCashService {

  private internalCash: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private internalBalances!: Balance[] | null;
  private internalExpenses!: SourceExpense[] | null;

  constructor(
    private _internalBalances: InternalBalancesService,
    private _internalExpenses: InternalExpensesService,
  ) {
    this.subscribeBalancesAndExpenses();

    combineLatest([this._internalBalances.getInternalBalances(), this._internalExpenses.getInternalExpenses()])
      .pipe(
        map(([balances, expenses]) => ({ balances, expenses }))
      )
      .subscribe(data => {
        this.internalBalances = data.balances;
        this.internalExpenses = data.expenses;
        this.addTotal();
      });
  }

  setInternalCash(sumTotal: number) {
    this.internalCash.next(sumTotal);
  }

  getInternalCash(): Observable<number> {
    return this.internalCash.asObservable();
  }

  private subscribeBalancesAndExpenses(): void {
    this._internalBalances.getInternalBalances().subscribe(balances => {
      this.internalBalances = balances;
    });

    this._internalExpenses.getInternalExpenses().subscribe(expenses => {
      this.internalExpenses = expenses;
    });
  }

  private addTotal(): void {

    let sumBalances: number = 0;
    let sumExpenses: number = 0;
    let sumTotal: number = 0;

    if (this.internalBalances && this.internalBalances.length > 0) {
      sumBalances = this.internalBalances
        .map(obj => obj.valueBalance)
        .reduce((acc, value) => acc + value, 0);
    }

    if (this.internalExpenses && this.internalExpenses.length > 0) {
      sumExpenses = this.internalExpenses
        .map(obj => obj.valueExpense)
        .reduce((acc, value) => acc + value, 0);
    }

    sumTotal = sumBalances - sumExpenses;

    this.setInternalCash(sumTotal);
  }
}