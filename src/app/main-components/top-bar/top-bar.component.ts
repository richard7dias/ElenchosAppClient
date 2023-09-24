import { Router } from '@angular/router';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';
import { Component, OnInit } from '@angular/core';
import { NumberService } from 'src/app/shared/formatting/number/number.service';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';
import { ApiSourceExpenseService } from 'src/app/core/api/source-expense/api-source-expense.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalExpensesService } from 'src/app/shared/internal-values/internal-expenses/internal-expenses.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  userName?: string;
  internalCash!: string;

  constructor(
    private _internalUser: InternalUserService,
    private _internalCash: InternalCashService,
    private _router: Router,
    private _apiBalances: ApiBalancesService,
    private _apiExpenses: ApiSourceExpenseService,
    private _internalBalances: InternalBalancesService,
    private _internalExpenses: InternalExpensesService,
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().subscribe(user => {
      this.userName = user?.firstName;
      if (user) {
        this.cashCalculate();
      }
    });

    this._internalCash.getInternalCash().subscribe(cash => {
      this.internalCash = cash;
    });
  }

  cashCalculate() {
    this._apiBalances.getBalances().subscribe(
      (response: HttpResponse<any>) => {
        this._internalBalances.setInternalBalances(response.body);
      }
    );

    this._apiExpenses.getSourceExpenses().subscribe(
      (response: HttpResponse<any>) => {
        this._internalExpenses.setInternalExpenses(response.body);
      }
    );
  }

  logout() {
    this._internalUser.setInternalUser(null);
    this._router.navigate(['/login']);
    localStorage.removeItem('authToken');
  }
}