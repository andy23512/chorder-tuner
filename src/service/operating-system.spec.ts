import { TestBed } from '@angular/core/testing';

import { OperatingSystem } from './operating-system';

describe('OperatingSystem', () => {
  let service: OperatingSystem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatingSystem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
