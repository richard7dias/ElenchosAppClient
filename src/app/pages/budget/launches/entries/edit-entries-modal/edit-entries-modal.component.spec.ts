import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntriesModalComponent } from './edit-entries-modal.component';

describe('EditEntriesModalComponent', () => {
  let component: EditEntriesModalComponent;
  let fixture: ComponentFixture<EditEntriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEntriesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEntriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
