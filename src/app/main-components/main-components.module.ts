import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';

import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    TopBarComponent,
    LeftBarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatCardModule
  ],
  exports: [
    TopBarComponent,
    LeftBarComponent
  ]
})
export class MainComponentsModule { }
