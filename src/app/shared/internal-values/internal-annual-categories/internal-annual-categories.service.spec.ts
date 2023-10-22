import { TestBed } from '@angular/core/testing';

import { InternalAnnualCategoriesService } from './internal-annual-categories.service';


describe('InternalCategoriesService', () => {
  let service: InternalAnnualCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalAnnualCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
