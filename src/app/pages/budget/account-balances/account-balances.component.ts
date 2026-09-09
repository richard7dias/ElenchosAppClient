import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';

@Component({
  selector: 'app-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.css']
})
export class AccountBalancesComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  internalCash: number = 0;
  displayedColumCash: string[] = ['cash'];

  constructor(
    private _internalCash: InternalCashService,
    public _numberFormat: NumberService
  ) { }

  ngOnInit() {
    this._internalCash.getInternalCash().pipe(takeUntil(this._destroy$)).subscribe(cash => {
      this.internalCash = cash;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
