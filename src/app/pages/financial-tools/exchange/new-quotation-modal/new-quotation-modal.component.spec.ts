import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotationModalComponent } from './new-quotation-modal.component';

describe('NewQuotationModalComponent', () => {
  let component: NewQuotationModalComponent;
  let fixture: ComponentFixture<NewQuotationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuotationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
