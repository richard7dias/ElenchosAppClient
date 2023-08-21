import { Component } from '@angular/core';

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

  calculate(): void {
    this.resultNumber = (this.km / this.economy) * this.fuel;

    if (Number.isNaN(this.resultNumber) || this.resultNumber == 0) {
      this.result = 'Erro! Digite todos os campos de forma correta.';
    } else {
      this.result = 'Você gastará R$' + this.resultNumber;
    }

    this.resultResolved = true;
  }

  closeResult(): void {
    this.resultResolved = false;
  }
}
