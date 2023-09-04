import { TestBed } from '@angular/core/testing';

import { ApiCurrencyService } from './api-currency.service';

describe('CurrencyService', () => {
  let service: ApiCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
