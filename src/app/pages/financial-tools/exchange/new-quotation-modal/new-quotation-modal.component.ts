import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Currency } from 'src/app/core/interfaces/currency.interface';
import { User } from 'src/app/core/interfaces/user.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';

@Component({
  selector: 'app-new-quotation-modal',
  templateUrl: './new-quotation-modal.component.html',
  styleUrls: ['./new-quotation-modal.component.css']
})
export class NewQuotationModalComponent {

  internalUser!: User;

  quoteFrom!: string;
  quoteFor!: string;
  quotationValue!: number;
  check!: string;

  constructor(
    private modalRef: MatDialogRef<NewQuotationModalComponent>,
    private alert: AlertService,
    private user: InternalUserService,
    private currencies: ApiCurrencyService,
    private loadingBar: LoadingService,
    private internalCurrency: InternalCurrencyService
  ) { }

  ngOnInit() {
    this.user.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    })
  }

  ngDoCheck() {
    if (this.quoteFrom && this.quoteFor && this.quotationValue) {
      this.check = `1 ${this.quoteFrom} é igual a ${this.quotationValue} (${this.quoteFor}).`;
    }
  }

  submitForm() {
    if (this.quoteFrom && this.quoteFor && this.quotationValue) {
      const newQuotation: Currency = {
        idOwner: this.internalUser.id,
        id: 'Criado na API',
        check: this.check,
        quotationValue: this.quotationValue,
        quoteFor: this.quoteFor,
        quoteFrom: this.quoteFrom
      }

      this.loadingBar.setLoadingBar(true);
      this.currencies.postCurrency(newQuotation).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.alert.openSnackBar(response.body.message);
          }
        },
        (response) => {
          this.alert.openSnackBar(response.error);
        }
      );
      
      this.internalCurrency.getInternalCurrency().subscribe(currencies => {
        const currenciesList: Currency[] = currencies || [];
        const updatedCurrenciesList = [...currenciesList, newQuotation];
        this.internalCurrency.setInternalCurrency(updatedCurrenciesList);
      });
      
      this.loadingBar.setLoadingBar(false);
      this.modalRef.close(true);
    } else {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.');
    }
  }
}
