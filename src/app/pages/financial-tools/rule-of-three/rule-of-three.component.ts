import { Component } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { NumberService } from 'src/app/shared/formatting/number.service';

@Component({
  selector: 'app-rule-of-three',
  templateUrl: './rule-of-three.component.html',
  styleUrls: ['./rule-of-three.component.css']
})
export class RuleOfThreeComponent {
  constructor(
    private alert: AlertService,
    private numberFormat: NumberService
  ) { }

  number1!: number;
  number2!: number;
  number3!: number;
  result: string | number = 0;

  calculate(): void {
    let calculate = (this.number3 * this.number2) / this.number1;

    if (isNaN(calculate)) {
      this.alert.openSnackBar('Erro! Digite todos os campos de forma correta.');
      this.result = 0;
    } else {
      this.result = this.numberFormat.inPortToDuo(calculate);
    }
  }
}
