import { TestBed } from '@angular/core/testing';

import { InternalLaunchesService } from './internal-launches.service';

describe('InternalLaunchesService', () => {
  let service: InternalLaunchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalLaunchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
