import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLaunchModalComponent } from './delete-launch-modal.component';

describe('DeleteLaunchModalComponent', () => {
  let component: DeleteLaunchModalComponent;
  let fixture: ComponentFixture<DeleteLaunchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLaunchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLaunchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
