import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    LeftBarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    TopBarComponent,
    LeftBarComponent
  ]
})
export class MainComponentsModule { }
