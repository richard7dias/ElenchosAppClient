import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedEntryModalComponent } from './payed-entry-modal.component';

describe('PayedEntryModalComponent', () => {
  let component: PayedEntryModalComponent;
  let fixture: ComponentFixture<PayedEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayedEntryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayedEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
