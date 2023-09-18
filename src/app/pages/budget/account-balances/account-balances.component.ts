import { Component } from '@angular/core';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';

@Component({
  selector: 'app-account-balances',
  templateUrl: './account-balances.component.html',
  styleUrls: ['./account-balances.component.css']
})
export class AccountBalancesComponent {

  internalCash: string = '0,00';
  displayedColumCash: string[] = ['cash'];

  constructor(
    private _internalCash: InternalCashService
  ) { }

  ngOnInit() {
    this._internalCash.getInternalCash().subscribe(cash => {
      this.internalCash = cash;
    });
  }
}
