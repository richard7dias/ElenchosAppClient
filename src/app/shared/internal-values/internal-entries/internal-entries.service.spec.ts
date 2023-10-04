import { TestBed } from '@angular/core/testing';

import { InternalEntriesService } from './internal-entries.service';

describe('InternalEntriesService', () => {
  let service: InternalEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
