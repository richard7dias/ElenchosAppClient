import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiCurrencyService } from 'src/app/core/api/currency/api-currency.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { Currency } from 'src/app/core/interfaces/currencies/currency.interface';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { InternalCurrencyService } from 'src/app/shared/internal-values/internal-currency/currency.service';

@Component({
  selector: 'app-new-quotation-modal',
  templateUrl: './new-quotation-modal.component.html',
  styleUrls: ['./new-quotation-modal.component.css']
})
export class NewQuotationModalComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  internalUser!: User;

  quoteFrom!: string;
  quoteFor!: string;
  quotationValue!: number;
  check!: string;
  updatedCurrenciesList: Currency[] | null = null;

  constructor(
    private modalRef: MatDialogRef<NewQuotationModalComponent>,
    private alert: AlertService,
    private user: InternalUserService,
    private currencies: ApiCurrencyService,
    private loadingBar: LoadingService,
    private internalCurrency: InternalCurrencyService
  ) { }

  ngOnInit() {
    this.user.getInternalUser().pipe(takeUntil(this._destroy$)).subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngDoCheck() {
    if (this.quoteFrom && this.quoteFor && this.quotationValue) {
      this.check = `1 ${this.quoteFor} é igual a ${this.quotationValue} (${this.quoteFrom}).`;
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
            this.modalRef.close(true);

            this.currencies.getCurrencies().subscribe(
              (currenciesResponse: HttpResponse<Currency[]>) => {
                this.updatedCurrenciesList = currenciesResponse.body;
                if (this.updatedCurrenciesList) {
                  this.internalCurrency.setInternalCurrency(this.updatedCurrenciesList);
                }
                this.loadingBar.setLoadingBar(false);
              }
            );
          }
        },
        (response) => {
          this.alert.openSnackBar(response.error);
          this.loadingBar.setLoadingBar(false);
        }
      );
    } else {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.');
    }
  }
}
