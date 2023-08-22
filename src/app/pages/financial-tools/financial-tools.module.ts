import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';


import { CoinComponent } from './coin/coin.component';
import { FuelComponent } from './fuel/fuel.component';
import { RuleOfThreeComponent } from './rule-of-three/rule-of-three.component';
import { FinancialToolsComponent } from './financial-tools.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    CoinComponent,
    FuelComponent,
    RuleOfThreeComponent,
    FinancialToolsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTabsModule
  ],
  exports: [
    CoinComponent,
    FuelComponent,
    RuleOfThreeComponent
  ]
})
export class FinancialToolsModule { }
