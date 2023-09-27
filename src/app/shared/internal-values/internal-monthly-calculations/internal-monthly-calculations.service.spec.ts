import { TestBed } from '@angular/core/testing';

import { InternalMonthlyCalculationsService } from './internal-monthly-calculations.service';

describe('InternalMonthlyCalculationsService', () => {
  let service: InternalMonthlyCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalMonthlyCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
