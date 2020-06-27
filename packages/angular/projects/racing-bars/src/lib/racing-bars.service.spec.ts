import { TestBed } from '@angular/core/testing';

import { RacingBarsService } from './racing-bars.service';

describe('RacingBarsService', () => {
  let service: RacingBarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacingBarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
