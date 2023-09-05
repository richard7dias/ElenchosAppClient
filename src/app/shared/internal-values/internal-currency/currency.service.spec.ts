import { TestBed } from '@angular/core/testing';

import { InternalCurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: InternalCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
