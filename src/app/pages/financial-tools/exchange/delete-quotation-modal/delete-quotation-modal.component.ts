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

  coin!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingBar: LoadingService,
    private apiCurrencies: ApiCurrencyService,
    private alert: AlertService,
    private internalCurrency: InternalCurrencyService,
    private modalRef: MatDialogRef<DeleteQuotationModalComponent>
  ) { }

  ngOnInit() {
    this.coin = this.data.coin;
    this.internalCurrency.getInternalCurrency().subscribe(currency => {
      if (currency) {
        this.currenciesList = currency;
      }
    });
  }

  deleteQuotation() {
    this.loadingBar.setLoadingBar(true);
    let newCurrenciesList: Currency[] | null = null;

    this.apiCurrencies.deleteCurrency('name', this.coin).subscribe(
      (response: HttpResponse<any>) => {
        this.alert.openSnackBar(response.body.message);

        if (this.currenciesList !== null) {
          newCurrenciesList = this.currenciesList.filter(
            c => c.quoteFor !== this.coin && c.quoteFrom !== this.coin
          );
        }

        this.internalCurrency.setInternalCurrency(newCurrenciesList);
        this.modalRef.close(true);
        this.loadingBar.setLoadingBar(false);
      }
    );
  }
}
