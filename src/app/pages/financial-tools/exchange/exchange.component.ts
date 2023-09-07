import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewQuotationModalComponent } from './new-quotation-modal/new-quotation-modal.component';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { HttpResponse } from '@angular/common/http';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { DeleteQuotationModalComponent } from './delete-quotation-modal/delete-quotation-modal.component';
import { EditQuotationModalComponent } from './edit-quotation-modal/edit-quotation-modal.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {

  currenciesList: Currency[] | null = null;

  coins: string[] = [];
  firstCoin!: number;
  inputValue!: string;
  secondCoin!: number;
  result: string | number = 0;
  selected1CoinOption: string | null = null;
  selected2CoinOption: string | null = null;

  constructor(
    private dialog: MatDialog,
    private alert: AlertService,
    private apiCurrencies: ApiCurrencyService,
    private internalCurrency: InternalCurrencyService,
    private loadingBar: LoadingService
  ) {
  }

  ngOnInit() {
    this.apiCurrencies.getCurrencies().subscribe(
      (response: HttpResponse<Currency[]>) => {
        this.currenciesList = response.body;
        if (this.currenciesList) {
          this.internalCurrency.setInternalCurrency(this.currenciesList);
          this.updateCoinsList();
        }
      }
    );
  }


  updateCoinsList() {
    this.internalCurrency.getInternalCurrency().subscribe(currencies => {
      const currenciesList: Currency[] = currencies || [];
      const uniqueCoins = new Set<string>();

      currenciesList.forEach(currency => {
        uniqueCoins.add(currency.quoteFor);
        uniqueCoins.add(currency.quoteFrom);
      });

      this.coins = Array.from(uniqueCoins);
      this.coins.sort();
    });
  }

  openModalNewQuotation() {
    this.dialog.open(NewQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalEditQuotation(){
    this.dialog.open(EditQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalDeleteQuotation(coin: string) {
    this.dialog.open(DeleteQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: { coin: coin }
    });
  }

  onSelectChange(selectedValue: string, selectValue: number) {
    switch (selectValue) {
      case 1:
        this.selected1CoinOption = selectedValue;
        break
      case 2:
        this.selected2CoinOption = selectedValue;
        break
    }
  }

  calculate(): void {

    this.alert.openSnackBar('Tem que fazer o cáculo depois que a api estiver top');
  }
}
