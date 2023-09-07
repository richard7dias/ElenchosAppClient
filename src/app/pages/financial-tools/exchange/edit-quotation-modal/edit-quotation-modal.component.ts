import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-edit-quotation-modal',
  templateUrl: './edit-quotation-modal.component.html',
  styleUrls: ['./edit-quotation-modal.component.css']
})
export class EditQuotationModalComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
}
