import { TestBed } from '@angular/core/testing';

import { ApiBalancesService } from './api-balances.service';

describe('ApiBalancesService', () => {
  let service: ApiBalancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBalancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
