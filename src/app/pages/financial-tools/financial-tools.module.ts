import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { ExchangeComponent } from './exchange/exchange.component';
import { FuelComponent } from './fuel/fuel.component';
import { RuleOfThreeComponent } from './rule-of-three/rule-of-three.component';
import { FinancialToolsComponent } from './financial-tools.component';
import { NewQuotationModalComponent } from './exchange/new-quotation-modal/new-quotation-modal.component';
import { DeleteQuotationModalComponent } from './exchange/delete-quotation-modal/delete-quotation-modal.component';
import { EditQuotationModalComponent } from './exchange/edit-quotation-modal/edit-quotation-modal.component';

@NgModule({
  declarations: [
    ExchangeComponent,
    FuelComponent,
    RuleOfThreeComponent,
    FinancialToolsComponent,
    NewQuotationModalComponent,
    DeleteQuotationModalComponent,
    EditQuotationModalComponent
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
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule
  ],
  exports: [
    ExchangeComponent,
    FuelComponent,
    RuleOfThreeComponent
  ]
})
export class FinancialToolsModule { }
