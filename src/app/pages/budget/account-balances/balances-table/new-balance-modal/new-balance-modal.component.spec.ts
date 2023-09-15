import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBalanceModalComponent } from './new-balance-modal.component';

describe('NewBalanceModalComponent', () => {
  let component: NewBalanceModalComponent;
  let fixture: ComponentFixture<NewBalanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBalanceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBalanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
