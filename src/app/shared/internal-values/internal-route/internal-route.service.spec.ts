import { TestBed } from '@angular/core/testing';

import { InternalRouteService } from './internal-route.service';

describe('InternalRouteService', () => {
  let service: InternalRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
