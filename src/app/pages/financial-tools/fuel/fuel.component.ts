import { Component } from '@angular/core';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NumberService } from 'src/app/core/formatting/number.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent {
  economy!: number;
  fuel!: number;
  km!: number;
  result!: string;
  resultNumber!: number;
  resultResolved: boolean = false;

  constructor(private alert: AlertService, private money: NumberService) { }

  calculate(): void {
    this.resultNumber = (this.km / this.economy) * this.fuel;

    if (isNaN(this.resultNumber) || this.resultNumber == 0) {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.', 'Fechar', 8);
      this.closeResult();
    } else {
      this.result = `Você gastará R$ ${this.money.inRealBRL(this.resultNumber)}.`;
      this.resultResolved = true;
    }
  }

  closeResult(): void {
    this.resultResolved = false;
  }
}
