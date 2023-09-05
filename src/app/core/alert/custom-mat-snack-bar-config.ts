import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class CustomMatSnackBarConfig extends MatSnackBarConfig {
  extraClasses?: string[] = [];
  zIndex?: number = 1000;
}