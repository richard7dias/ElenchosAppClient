import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesLaunchesTableComponent } from './entries-launches-table.component';

describe('EntriesLaunchesTableComponent', () => {
  let component: EntriesLaunchesTableComponent;
  let fixture: ComponentFixture<EntriesLaunchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntriesLaunchesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesLaunchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
