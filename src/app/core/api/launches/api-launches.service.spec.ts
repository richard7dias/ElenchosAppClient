import { TestBed } from '@angular/core/testing';

import { ApiLaunchesService } from './api-launches.service';

describe('ApiLaunchesService', () => {
  let service: ApiLaunchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLaunchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
