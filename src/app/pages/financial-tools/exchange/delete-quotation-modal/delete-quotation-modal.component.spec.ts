import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuotationModalComponent } from './delete-quotation-modal.component';

describe('DeleteQuotationModalComponent', () => {
  let component: DeleteQuotationModalComponent;
  let fixture: ComponentFixture<DeleteQuotationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuotationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
