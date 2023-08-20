import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBudgetComponent } from './travel-budget.component';

describe('TravelBudgetComponent', () => {
  let component: TravelBudgetComponent;
  let fixture: ComponentFixture<TravelBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
