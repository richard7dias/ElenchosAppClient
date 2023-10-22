import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';

import { ApiEntriesService } from 'src/app/core/api/entries/api-entries.service';
import { Balance } from 'src/app/core/interfaces/balances/balance.interface';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {

  internalUser!: User;
  internalEntries!: Entry[];

  dateInput: string = new Date().toISOString();
  descriptionInput!: string;
  payerInput!: string;
  valueInput!: number;

  constructor(
    private _internalUser: InternalUserService,
    private _apiEntries: ApiEntriesService,
    private _internalEntries: InternalEntriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _renderer: Renderer2,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    });

    this._renderer.selectRootElement('#descriptionInput').focus();
  }

  newExpense() {
    if (this.dateInput && this.descriptionInput && this.payerInput && this.valueInput) {
      let newEntry: Entry = {
        idOwner: this.internalUser.id,
        id: 'Feito na API',
        date: this.dateInput,
        description: this.descriptionInput,
        payer: this.payerInput,
        value: this.valueInput,
        payed: false
      }

      this._loadingBar.setLoadingBar(true);
      this._apiEntries.postEntry(newEntry).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this.clearInputs();
            this._loadingBar.setLoadingBar(false);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error);
          this._loadingBar.setLoadingBar(false);
        }
      );

      this._apiEntries.getEntries().subscribe(
        (response: HttpResponse<Entry[]>) => {
          this._internalEntries.setInternalEntries(response.body);
          this._loadingBar.setLoadingBar(false);
        }
      );

      this.updateBalances();

    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }

  updateBalances() {
    this._apiBalances.getBalances().subscribe(
      (response: HttpResponse<Balance[]>) => {
        if (response.body) {
          this._internalBalances.setInternalBalances(response.body);
        }
      }
    );
  }

  clearInputs() {
    this.dateInput = new Date().toISOString();
    this.descriptionInput = '';
    this.payerInput = null as any;
    this.valueInput = null as any;

    this._renderer.selectRootElement('#descriptionInput').focus();
  }
}
