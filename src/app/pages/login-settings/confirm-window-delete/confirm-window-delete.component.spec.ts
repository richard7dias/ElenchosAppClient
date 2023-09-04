import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWindowDeleteComponent } from './confirm-window-delete.component';

describe('ConfirmWindowComponent', () => {
  let component: ConfirmWindowDeleteComponent;
  let fixture: ComponentFixture<ConfirmWindowDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmWindowDeleteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmWindowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
