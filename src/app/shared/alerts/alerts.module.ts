import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    ErrorComponent
  ]
})
export class AlertsModule { }
