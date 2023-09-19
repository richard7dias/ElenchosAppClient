import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';

import { LaunchesComponent } from './launches.component';

@NgModule({
  declarations: [
    LaunchesComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonToggleModule,
    RouterModule,
    MatChipsModule
  ]
})
export class LaunchesModule { }
