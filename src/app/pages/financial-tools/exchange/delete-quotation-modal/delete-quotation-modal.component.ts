import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-quotation-modal',
  templateUrl: './delete-quotation-modal.component.html',
  styleUrls: ['./delete-quotation-modal.component.css']
})
export class DeleteQuotationModalComponent {

  currenciesList: Currency[] | null = null;

  currencyNameOrId!: string;
  isIdOrName: string = 'name';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingBar: LoadingService,
    private apiCurrencies: ApiCurrencyService,
    private alert: AlertService,
    private internalCurrency: InternalCurrencyService,
    private modalRef: MatDialogRef<DeleteQuotationModalComponent>
  ) { }

  ngOnInit() {
    this.isIdOrName = this.data.isIdOrName;
    this.currencyNameOrId = this.data.coin;
    this.internalCurrency.getInternalCurrency().subscribe(currency => {
      if (currency) {
        this.currenciesList = currency;
      }
    });
  }

  deleteQuotation() {
    this.loadingBar.setLoadingBar(true);
    let newCurrenciesList: Currency[] | null = null;

    this.apiCurrencies.deleteCurrency(this.isIdOrName, this.currencyNameOrId).subscribe(
      (response: HttpResponse<any>) => {
        this.alert.openSnackBar(response.body.message);

        if (this.currenciesList !== null) {
          if (this.isIdOrName === 'name') {
            newCurrenciesList = this.currenciesList.filter(
              c => c.quoteFor !== this.currencyNameOrId && c.quoteFrom !== this.currencyNameOrId
            );
          } else if (this.isIdOrName === 'id') {
            newCurrenciesList = this.currenciesList.filter(
              c => c.id !== this.currencyNameOrId
            );
          }
        }

        this.internalCurrency.setInternalCurrency(newCurrenciesList);
        this.modalRef.close(true);
        this.loadingBar.setLoadingBar(false);
      }, (response) => {
        this.alert.openSnackBar(response.error.message);
        this.loadingBar.setLoadingBar(false);
      }
    );
  }
}
