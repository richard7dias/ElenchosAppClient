import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualCategoriesComponent } from './annual-categories.component';

describe('AnnualCategoriesComponent', () => {
  let component: AnnualCategoriesComponent;
  let fixture: ComponentFixture<AnnualCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
