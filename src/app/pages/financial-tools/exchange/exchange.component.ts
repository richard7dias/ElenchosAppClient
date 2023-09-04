import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewQuotationModalComponent } from './new-quotation-modal/new-quotation-modal.component';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {

  coins: string[] = ['Real', 'Dólar', 'Peso'];
  firstCoin!: number;
  inputValue!: string;
  secondCoin!: number;
  result: string | number = 0;

  constructor(
    public dialog: MatDialog,
    private alert: AlertService
  ) { }

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

    this.alert.openSnackBar('Tem que fazer o cáculo depois que a api estiver top', 'Fechar', 6);
  }
}
