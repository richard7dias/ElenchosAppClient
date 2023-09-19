import { Component } from '@angular/core';
import { InternalRouteService } from 'src/app/shared/internal-values/internal-route/internal-route.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent {

  dashboardChecked: boolean = false;
  budgetChecked: boolean = false;
  investChecked: boolean = false;
  travelChecked: boolean = false;
  toolsChecked: boolean = false;

  constructor(private _internalRoute: InternalRouteService) {
    this._internalRoute.getParentCurrentRoute().subscribe(route => {
      this.removeChecked();
      switch (route) {
        case 'dashboard':
          this.dashboardChecked = true;
          break;
        case 'budget':
          this.budgetChecked = true;
          break;
        case 'invest':
          this.investChecked = true;
          break;
        case 'travel':
          this.travelChecked = true;
          break;
        case 'tools':
          this.toolsChecked = true;
          break;
      }
    });
  }

  removeChecked() {
    this.dashboardChecked = false;
    this.budgetChecked = false;
    this.investChecked = false;
    this.travelChecked = false;
    this.toolsChecked = false;
  }
}