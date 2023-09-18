import { TestBed } from '@angular/core/testing';

import { InternalCashService } from './internal-cash.service';

describe('InternalCashService', () => {
  let service: InternalCashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalCashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
