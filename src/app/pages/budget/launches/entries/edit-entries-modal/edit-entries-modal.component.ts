import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiBalancesService } from 'src/app/core/api/balances/api-balances.service';
import { ApiEntriesService } from 'src/app/core/api/entries/api-entries.service';
import { Balance } from 'src/app/core/interfaces/balances/balance.interface';
import { Entry } from 'src/app/core/interfaces/entries/entry.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { DateService } from 'src/app/shared/formatting/date/date.service';
import { InternalBalancesService } from 'src/app/shared/internal-values/internal-balances/internal-balances.service';
import { InternalEntriesService } from 'src/app/shared/internal-values/internal-entries/internal-entries.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-entries-modal',
  templateUrl: './edit-entries-modal.component.html',
  styleUrls: ['./edit-entries-modal.component.css']
})
export class EditEntriesModalComponent {

  internalEntries!: Entry[];

  dateInput!: string;
  descriptionInput!: string;
  payerInput!: string;
  valueInput!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _internalEntries: InternalEntriesService,
    private _apiEntries: ApiEntriesService,
    private _loadingBar: LoadingService,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<EditEntriesModalComponent>,
    private _dateFormat: DateService,
    private _apiBalances: ApiBalancesService,
    private _internalBalances: InternalBalancesService
  ) { }

  ngOnInit() {
    this.dateInput = this._dateFormat.stringToDate(this._data.date).toISOString();
    this.descriptionInput = this._data.description;
    this.payerInput = this._data.payer;
    this.valueInput = this._data.value;
  }

  submitForm(): void {
    if (this.dateInput && this.descriptionInput && this.payerInput && this.valueInput) {

      let entryEdited: Entry = {
        idOwner: this._data.idOwner,
        id: this._data.id,
        date: this.dateInput,
        description: this.descriptionInput,
        payer: this.payerInput,
        value: this.valueInput,
        payed: false
      }

      this._loadingBar.setLoadingBar(true);
      this._apiEntries.patchEntry(this._data.id, entryEdited).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._alert.openSnackBar(response.body.message);
            this.updateEntries();
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
