import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMatSnackBarConfig } from './custom-mat-snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    const config = new CustomMatSnackBarConfig();
    config.duration = 7000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    config.panelClass = ['custom-snackbar'];
    config.extraClasses = ['my-custom-snackbar'];
    config.zIndex = 1000;

    this._snackBar.open(message, 'Fechar', config);
  }
}
