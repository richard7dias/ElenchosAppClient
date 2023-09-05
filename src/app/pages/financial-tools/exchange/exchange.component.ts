import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewQuotationModalComponent } from './new-quotation-modal/new-quotation-modal.component';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { HttpResponse } from '@angular/common/http';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {

  coins: string[] = [];
  firstCoin!: number;
  inputValue!: string;
  secondCoin!: number;
  result: string | number = 0;

  constructor(
    private dialog: MatDialog,
    private alert: AlertService,
    private apiCurrencies: ApiCurrencyService,
    private internalCurrency: InternalCurrencyService
  ) { }

  ngOnInit() {
    this.apiCurrencies.getCurrencies().subscribe(
      (response: HttpResponse<Currency[]>) => {
        const currenciesList: Currency[] | null = response.body;
        if (currenciesList) {
          this.internalCurrency.setInternalCurrency(currenciesList);
        }
      }
    );

    this.internalCurrency.getInternalCurrency().subscribe(currencies => {
      const currenciesList: Currency[] = currencies || [];
      const uniqueCoins = new Set<string>();

      currenciesList.forEach(currency => {
        uniqueCoins.add(currency.quoteFor);
        uniqueCoins.add(currency.quoteFrom);
      });

      this.coins = Array.from(uniqueCoins);
      this.coins.sort();
    })
  }

  openModal() {
    const modalRef = this.dialog.open(NewQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  calculate(): void {

    this.alert.openSnackBar('Tem que fazer o cáculo depois que a api estiver top');
  }
}
