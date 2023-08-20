import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialToolsComponent } from './financial-tools.component';

describe('FinancialToolsComponent', () => {
  let component: FinancialToolsComponent;
  let fixture: ComponentFixture<FinancialToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
