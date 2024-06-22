import { TestBed } from '@angular/core/testing';

import { BobsburgersService } from './bobsburgers.service';

describe('BobsburgersService', () => {
  let service: BobsburgersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BobsburgersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
