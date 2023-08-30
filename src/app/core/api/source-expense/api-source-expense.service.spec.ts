import { TestBed } from '@angular/core/testing';

import { ApiSourceExpenseService } from './api-source-expense.service';

describe('ApiSourceExpenseService', () => {
  let service: ApiSourceExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSourceExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
