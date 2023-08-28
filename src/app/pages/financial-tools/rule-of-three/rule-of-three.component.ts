import { Component } from '@angular/core';
import { ErrorsService } from 'src/app/core/alerts/error.service';

@Component({
  selector: 'app-rule-of-three',
  templateUrl: './rule-of-three.component.html',
  styleUrls: ['./rule-of-three.component.css']
})
export class RuleOfThreeComponent {
  constructor(private _errors: ErrorsService) { }

  number1!: number;
  number2!: number;
  number3!: number;
  result: number = 0;

  calculate(): void {
    this.result = (this.number3 * this.number2) / this.number1;

    if (isNaN(this.result)) {
      this._errors.openSnackBar('Erro! Digite todos os campos de forma correta.', 'Fechar', 8);
      this.result = 0;
    }
  }
}
