import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';
import { DeleteQuotationModalComponent } from './delete-quotation-modal/delete-quotation-modal.component';
import { EditQuotationModalComponent } from './edit-quotation-modal/edit-quotation-modal.component';
import { NumberService } from 'src/app/shared/formatting/number.service';
import { NewQuotationModalComponent } from './new-quotation-modal/new-quotation-modal.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {

  currenciesList: Currency[] | null = null;

  coins: string[] = [];
  inputValue!: number;
  firstCoin!: string;
  secondCoin!: string;
  result: string = '0';
  selected1CoinOption: string | null = null;
  selected2CoinOption: string | null = null;
  showChange: boolean = false;

  constructor(
    private dialog: MatDialog,
    private alert: AlertService,
    private apiCurrencies: ApiCurrencyService,
    private internalCurrency: InternalCurrencyService,
    private numberFormat: NumberService
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

  ngDoCheck() {
    if (this.inputValue && this.firstCoin && this.secondCoin) {
      this.calculate();
    }

    if (this.firstCoin && this.secondCoin) {
      this.showChange = true;
    }
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

  openModalEditQuotation() {
    this.dialog.open(EditQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  openModalDeleteQuotation(coin: string) {
    this.dialog.open(DeleteQuotationModalComponent, {
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
      data: { isIdOrName: 'name', coin: coin }
    });
  }

  changeSelect() {
    let first = this.firstCoin;
    let second = this.secondCoin;
    let selected1 = this.selected1CoinOption;
    let selected2 = this.selected2CoinOption;

    this.firstCoin = second;
    this.secondCoin = first;
    this.selected1CoinOption = selected2;
    this.selected2CoinOption = selected1;
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
    if (this.inputValue && this.firstCoin && this.secondCoin) {
      if (this.currenciesList) {
        let currentFiltered: Currency[] | null = null;

        currentFiltered = this.currenciesList.filter(
          c => c.quoteFor == this.firstCoin && c.quoteFrom == this.secondCoin
        );

        if (currentFiltered && currentFiltered.length > 0) {
          this.result = this.numberFormat.inPortToDuo(
            this.inputValue * currentFiltered[0].quotationValue
          );
        } else {
          currentFiltered = this.currenciesList.filter(
            c => c.quoteFrom == this.firstCoin && c.quoteFor == this.secondCoin
          );

          if (currentFiltered && currentFiltered.length > 0) {
            this.result = this.numberFormat.inPortToDuo(
              this.inputValue / currentFiltered[0].quotationValue
            );
          } else {
            this.result = `Não há cotação envolvendo ${this.firstCoin} com ${this.secondCoin}`;
          }
        }
      }
    }
  }
}
