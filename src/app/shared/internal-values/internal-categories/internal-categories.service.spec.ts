import { TestBed } from '@angular/core/testing';

import { InternalCategoriesService } from './internal-categories.service';


describe('InternalCategoriesService', () => {
  let service: InternalCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
