import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesTableComponent } from './balances-table.component';

describe('TableBalancesComponent', () => {
  let component: BalancesTableComponent;
  let fixture: ComponentFixture<BalancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalancesTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BalancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
