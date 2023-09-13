import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBudgetComponent } from './monthly-budget.component';

describe('CurrencyComponent', () => {
  let component: MonthlyBudgetComponent;
  let fixture: ComponentFixture<MonthlyBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyBudgetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MonthlyBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
