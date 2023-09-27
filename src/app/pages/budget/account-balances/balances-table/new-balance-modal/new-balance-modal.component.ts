import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { Balance } from 'src/app/core/interfaces/balance.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-new-balance-modal',
  templateUrl: './new-balance-modal.component.html',
  styleUrls: ['./new-balance-modal.component.css']
})
export class NewBalanceModalComponent {

  internalUser!: User;
  internalBalances!: Balance[];

  newAccountName!: string;
  newAccountValue!: number;

  constructor(
    private _internalBalances: InternalBalancesService,
    private _apiBalances: ApiBalancesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _internalUser: InternalUserService,
    private _modalRef: MatDialogRef<NewBalanceModalComponent>,
  ) { }

  ngOnInit() {
    this._internalUser.getInternalUser().subscribe(internalUser => {
      if (internalUser) {
        this.internalUser = internalUser;
      }
    });

    this._internalBalances.getInternalBalances().subscribe(internalBalances => {
      if (internalBalances) {
        this.internalBalances = internalBalances;
      }
    }
    );
  }

  submitForm(): void {
    if (this.newAccountName && this.newAccountValue) {
      let newBalance: Balance = {
        id: 'Feito na API',
        idOwner: this.internalUser.id,
        account: this.newAccountName,
        valueBalance: this.newAccountValue
      }

      this._loadingBar.setLoadingBar(true);
      this._apiBalances.postBalance(newBalance).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this._alert.openSnackBar(response.body.message);
            this._modalRef.close(true);
          }
        },
        (response) => {
          this._alert.openSnackBar(response.error);
        }
      );

      this._apiBalances.getBalances().subscribe(
        (response: HttpResponse<Balance[]>) => {
          this._internalBalances.setInternalBalances(response.body);
        }
      );

      this._loadingBar.setLoadingBar(false);
    } else {
      this._alert.openSnackBar('Preencha todos os campos necessários!')
    }
  }
}
