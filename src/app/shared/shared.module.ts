import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MenuEditDeleteForTableComponent } from './menu-edit-delete-for-table/menu-edit-delete-for-table.component';


@NgModule({
  declarations: [
    MenuEditDeleteForTableComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class SharedModule { }
