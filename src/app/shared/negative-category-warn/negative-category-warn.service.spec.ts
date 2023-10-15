import { TestBed } from '@angular/core/testing';

import { NegativeCategoryWarnService } from './negative-category-warn.service';

describe('NegativeCategoryWarnService', () => {
  let service: NegativeCategoryWarnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegativeCategoryWarnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
