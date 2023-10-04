import { TestBed } from '@angular/core/testing';

import { ApiEntriesService } from './api-entries.service';

describe('ApiEntriesService', () => {
  let service: ApiEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
