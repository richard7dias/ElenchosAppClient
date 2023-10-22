import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAnnualCategoryModalComponent } from './delete-annual-category-modal.component';

describe('DeleteAnnualCategoryModalComponent', () => {
  let component: DeleteAnnualCategoryModalComponent;
  let fixture: ComponentFixture<DeleteAnnualCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAnnualCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAnnualCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
