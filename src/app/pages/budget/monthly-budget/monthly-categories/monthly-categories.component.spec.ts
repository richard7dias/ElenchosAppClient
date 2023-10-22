import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCategoriesComponent } from './monthly-categories.component';

describe('MonthlyCategoriesComponent', () => {
  let component: MonthlyCategoriesComponent;
  let fixture: ComponentFixture<MonthlyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
