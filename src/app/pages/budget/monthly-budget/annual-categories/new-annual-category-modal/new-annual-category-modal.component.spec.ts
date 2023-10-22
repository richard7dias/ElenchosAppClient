import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnualCategoryModalComponent } from './new-annual-category-modal.component';

describe('NewAnnualCategoryModalComponent', () => {
  let component: NewAnnualCategoryModalComponent;
  let fixture: ComponentFixture<NewAnnualCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAnnualCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnualCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
