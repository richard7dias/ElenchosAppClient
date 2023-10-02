import { Component } from '@angular/core';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';

@Component({
  selector: 'app-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.css']
})
export class AccountBalancesComponent {

  internalCash: number = 0;
  displayedColumCash: string[] = ['cash'];

  constructor(
    private _internalCash: InternalCashService,
    public _numberFormat: NumberService
  ) { }

  ngOnInit() {
    this._internalCash.getInternalCash().subscribe(cash => {
      this.internalCash = cash;
    });
  }
}
