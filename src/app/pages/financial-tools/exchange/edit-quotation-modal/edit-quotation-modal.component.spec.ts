import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationModalComponent } from './edit-quotation-modal.component';

describe('EditQuotationModalComponent', () => {
  let component: EditQuotationModalComponent;
  let fixture: ComponentFixture<EditQuotationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuotationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
