import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLaunchModalComponent } from './edit-launch-modal.component';

describe('EditLaunchModalComponent', () => {
  let component: EditLaunchModalComponent;
  let fixture: ComponentFixture<EditLaunchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLaunchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLaunchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
