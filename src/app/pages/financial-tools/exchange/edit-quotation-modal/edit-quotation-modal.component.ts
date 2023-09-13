import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';
import { DeleteQuotationModalComponent } from '../delete-quotation-modal/delete-quotation-modal.component';
import { NewQuotationModalComponent } from '../new-quotation-modal/new-quotation-modal.component';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-edit-quotation-modal',
  templateUrl: './edit-quotation-modal.component.html',
  styleUrls: ['./edit-quotation-modal.component.css']
})
export class EditQuotationModalComponent {

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  internalCurrency!: Currency[];

  titlesCheck: string[] = [];

  constructor(
    private currencies: InternalCurrencyService,
    private apiCurrency: ApiCurrencyService,
    private alert: AlertService,
    private dialog: MatDialog,
    private loadingBar: LoadingService,
  ) { }

  ngOnInit() {
    this.refreshCurrencies();
  }

  refreshCurrencies() {
    this.currencies.getInternalCurrency().subscribe(currencies => {
      if (currencies) {
        this.internalCurrency = currencies;
        currencies.forEach(currency => {
          this.titlesCheck.push(currency.check);
        });
      }
    });
  }

  calculateCheck(currency: Currency) {
    return `1 ${currency.quoteFor} é igual a ${currency.quotationValue} (${currency.quoteFrom})`;
  }

  editCurrency(currency: Currency, panel: MatExpansionPanel) {
    if (currency.quotationValue && currency.quoteFrom && currency.quoteFor) {
      let editedCurrency: Currency = {
        idOwner: currency.idOwner,
        id: currency.id,
        check: this.calculateCheck(currency),
        quotationValue: currency.quotationValue,
        quoteFor: currency.quoteFor,
        quoteFrom: currency.quoteFrom
      }
      this.loadingBar.setLoadingBar(true);
      this.apiCurrency.patchCurrency(editedCurrency.id, editedCurrency).subscribe(
        (response: HttpResponse<any>) => {
          this.alert.openSnackBar(response.body.message);
          panel.close();
        }
      );
      this.refreshCurrencies();
      this.currencies.setInternalCurrency(this.internalCurrency);
      this.loadingBar.setLoadingBar(false);
    } else {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.');
    }
  }

  openModalNewQuotation() {
    this.dialog.closeAll();
    this.dialog.open(NewQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalDeleteQuotation(coin: string) {
    this.dialog.open(DeleteQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: { isIdOrName: 'id', coin: coin }
    });
  }
}
