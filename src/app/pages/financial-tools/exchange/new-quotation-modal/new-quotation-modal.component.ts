import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-new-quotation-modal',
  templateUrl: './new-quotation-modal.component.html',
  styleUrls: ['./new-quotation-modal.component.css']
})
export class NewQuotationModalComponent {

  quoteFrom!: string;
  quoteFor!: string;
  quotationValue!: number;
  check!: string;

  constructor(
    public modalRef: MatDialogRef<NewQuotationModalComponent>,
    private alert: AlertService
  ) { }

  ngDoCheck() {
    if (this.quoteFrom && this.quoteFor && this.quotationValue) {
      this.check = `1 ${this.quoteFrom} é igual a ${this.quotationValue} (${this.quoteFor}).`;
    }
  }

  submitForm() {
    if (this.quoteFrom && this.quoteFor && this.quotationValue) {
      const newQuotation = {
        idOwner: 'pegar o id aqui',
        check: this.check,
        quotationValue: this.quotationValue,
        quoteFor: this.quoteFor,
        quoteFrom: this.quoteFrom
      }

      //implementar aqui a lógica para salvar na api com o guid do usuário logado

      this.modalRef.close(true);
      this.alert.openSnackBar('Cotação adicionada com sucesso!', 'Ok', 5);
    } else {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.', 'Fechar', 8);
    }
  }
}
