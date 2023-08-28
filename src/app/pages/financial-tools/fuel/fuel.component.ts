import { Component } from '@angular/core';
import { ErrorsService } from 'src/app/core/alerts/error.service';

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

  constructor(private errors: ErrorsService) { }

  calculate(): void {
    this.resultNumber = (this.km / this.economy) * this.fuel;

    if (isNaN(this.resultNumber) || this.resultNumber == 0) {
      this.errors.openSnackBar('Erro! Digite todos os campos de forma correta.', 'Fechar', 8);
    } else {
      this.result = 'Você gastará R$' + this.resultNumber;
      this.resultResolved = true;
    }
  }

  closeResult(): void {
    this.resultResolved = false;
  }
}
