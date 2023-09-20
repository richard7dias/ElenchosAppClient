import { Component } from '@angular/core';

import { InternalRouteService } from 'src/app/shared/internal-values/internal-route/internal-route.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css']
})
export class LaunchesComponent {

  entriesChecked: boolean = false;
  expensesChecked: boolean = false;

  constructor(private _internalRoute: InternalRouteService) {
    this._internalRoute.getLastChildCurrentRoute().subscribe(route => {
      this.removeChecked();
      switch (route) {
        case 'entries':
          this.entriesChecked = true;
          break;
        case 'expenses':
          this.expensesChecked = true;
          break;
      }
    });
  }

  removeChecked() {
    this.entriesChecked = false;
    this.expensesChecked = false;
  }
}
