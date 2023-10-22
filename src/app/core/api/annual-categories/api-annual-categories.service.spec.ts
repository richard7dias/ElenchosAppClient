import { TestBed } from '@angular/core/testing';

import { ApiAnnualCategoriesService } from './api-annual-categories.service';

describe('ApiService', () => {
  let service: ApiAnnualCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAnnualCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
