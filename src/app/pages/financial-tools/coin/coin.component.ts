import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AlertService } from 'src/app/core/alert/alert.service';
import { NumberService } from 'src/app/core/formatting/number.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent {

  coins: string[] = ['Real', 'Dólar', 'Peso'];
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  filteredOptions1!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;
  firstCoin!: number;
  secondCoin!: number;
  result: string | number = 0;

  constructor(private _errors: AlertService, private numberFormat: NumberService) { }

  ngOnInit() {
    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value || '')),
    );
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.coins.filter(option => option.toLowerCase().includes(filterValue));
  }

  calculate(): void {
    console.log(this.filteredOptions1);
  }
}
