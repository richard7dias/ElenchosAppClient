import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLaunchesTableComponent } from './expense-launches-table.component';

describe('ExpenseLaunchesTableComponent', () => {
  let component: ExpenseLaunchesTableComponent;
  let fixture: ComponentFixture<ExpenseLaunchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseLaunchesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseLaunchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
