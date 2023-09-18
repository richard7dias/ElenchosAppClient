import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseModalComponent } from './new-expense-modal.component';

describe('NewExpenseModalComponent', () => {
  let component: NewExpenseModalComponent;
  let fixture: ComponentFixture<NewExpenseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpenseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
