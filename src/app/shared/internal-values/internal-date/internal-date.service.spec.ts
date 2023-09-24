import { TestBed } from '@angular/core/testing';

import { InternalDateService } from './internal-date.service';

describe('InternalDateService', () => {
  let service: InternalDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
