import { Router } from '@angular/router';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';
import { Component, OnInit } from '@angular/core';
import { NumberService } from 'src/app/shared/formatting/number.service';
import { InternalCashService } from 'src/app/shared/internal-values/internal-cash/internal-cash.service';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { HttpResponse } from '@angular/common/http';

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
    private _numberFormat: NumberService,

    private _apiBalances: ApiBalancesService
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().subscribe(user => {
      this.userName = user?.firstName;
    });

    this._internalCash.getInternalCash().subscribe(cash => {
      this.internalCash = cash;
    });
  }

  logout() {
    this._internalUser.setInternalUser(null);
    this._router.navigate(['/login']);
    localStorage.removeItem('authToken');
  }
}