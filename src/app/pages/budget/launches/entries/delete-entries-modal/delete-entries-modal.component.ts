import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { ApiEntriesService } from 'src/app/core/api/entries/api-entries.service';
import { Balance } from 'src/app/core/interfaces/balances/balance.interface';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-entries-modal',
  templateUrl: './delete-entries-modal.component.html',
  styleUrls: ['./delete-entries-modal.component.css']
})
export class DeleteEntriesModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteEntriesModalComponent>,
    private _loadingBar: LoadingService,
    private _apiEntries: ApiEntriesService,
    private _internalEntries: InternalEntriesService,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService
  ) { }

  deleteLaunch() {
    this._loadingBar.setLoadingBar(true);
    this._apiEntries.deleteEntry(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateEntries();
        this.updateBalances();
        this._loadingBar.setLoadingBar(false);
      },
      (response) => {
        this._alert.openSnackBar(response.error.message);
        this._loadingBar.setLoadingBar(false);
      }
    );
    this._modalRef.close(true);
  }

  updateEntries() {
    this._apiEntries.getEntries().subscribe(
      (response: HttpResponse<Entry[]>) => {
        if (response.body) {
          this._internalEntries.setInternalEntries(response.body);
        }
      }
    );
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