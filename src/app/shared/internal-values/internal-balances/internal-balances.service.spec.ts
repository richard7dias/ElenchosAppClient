import { TestBed } from '@angular/core/testing';

import { InternalBalancesService } from './internal-balances.service';

describe('InternalBalancesService', () => {
  let service: InternalBalancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalBalancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
