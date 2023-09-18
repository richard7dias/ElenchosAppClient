import { TestBed } from '@angular/core/testing';

import { InternalExpensesService } from './internal-expenses.service';

describe('InternalExpensesService', () => {
  let service: InternalExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
