import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnualCategoryModalComponent } from './edit-annual-category-modal.component';

describe('EditAnnualCategoryModalComponent', () => {
  let component: EditAnnualCategoryModalComponent;
  let fixture: ComponentFixture<EditAnnualCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnualCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnnualCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
