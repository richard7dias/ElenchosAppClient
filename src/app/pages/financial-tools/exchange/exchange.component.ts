import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewQuotationModalComponent } from './new-quotation-modal/new-quotation-modal.component';

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

  constructor(public dialog: MatDialog) { }

  openModal() {
    const modalRef = this.dialog.open(NewQuotationModalComponent);

    modalRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  calculate(): void {

  }
}
