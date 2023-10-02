import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntriesModalComponent } from './delete-entries-modal.component';

describe('DeleteEntriesModalComponent', () => {
  let component: DeleteEntriesModalComponent;
  let fixture: ComponentFixture<DeleteEntriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEntriesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEntriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
