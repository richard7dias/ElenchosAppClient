import { Component } from '@angular/core';

import { InternalRouteService } from 'src/app/shared/internal-values/internal-route/internal-route.service';

@Component({
  selector: 'app-financial-tools',
  templateUrl: './financial-tools.component.html',
  styleUrls: ['./financial-tools.component.css']
})
export class FinancialToolsComponent {

  fuelChecked: boolean = false;
  coinChecked: boolean = false;
  ruleOfThreeChecked: boolean = false;

  constructor(private _internalRoute: InternalRouteService) {
    this._internalRoute.getLastChildCurrentRoute().subscribe(route => {
      this.removeChecked();
      switch (route) {
        case 'fuel':
          this.fuelChecked = true;
          break;
        case 'coin':
          this.coinChecked = true;
          break;
        case 'rule-of-three':
          this.ruleOfThreeChecked = true;
          break;
      }
    });
  }

  removeChecked() {
    this.fuelChecked = false;
    this.coinChecked = false;
    this.ruleOfThreeChecked = false;
  }
}
