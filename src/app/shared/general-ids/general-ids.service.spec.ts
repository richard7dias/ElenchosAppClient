import { TestBed } from '@angular/core/testing';

import { GeneralIdsService } from './general-ids.service';

describe('GeneralIdsService', () => {
  let service: GeneralIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
