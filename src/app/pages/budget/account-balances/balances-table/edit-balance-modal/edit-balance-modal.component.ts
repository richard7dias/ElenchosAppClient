import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { Balance } from 'src/app/core/interfaces/balance.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-balance-modal',
  templateUrl: './edit-balance-modal.component.html',
  styleUrls: ['./edit-balance-modal.component.css']
})
export class EditBalanceModalComponent {

  accountNameInput!: string;
  accountValueInput!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalBalances: InternalBalancesService,
    private _apiBalances: ApiBalancesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditBalanceModalComponent>,
  ) { }

  ngOnInit() {
    this.accountNameInput = this._data.account;
    this.accountValueInput = this._data.valueBalance;
  }

  submitForm(): void {
    if (this.accountNameInput && this.accountValueInput) {

      let balanceEdited: Balance = {
        id: this._data.id,
        idOwner: this._data.idOwner,
        account: this.accountNameInput,
        valueBalance: this.accountValueInput
      }

      this._loadingBar.setLoadingBar(true);
      this._apiBalances.patchBalance(this._data.id, balanceEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateBalances();
            this._modalRef.close(true);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error.message);
        }
      );
      this._loadingBar.setLoadingBar(false);

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
}
