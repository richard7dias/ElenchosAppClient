import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    LeftBarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopBarComponent,
    LeftBarComponent
  ]
})
export class MainComponentsModule { }
