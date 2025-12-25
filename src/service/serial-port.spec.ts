import { TestBed } from '@angular/core/testing';

import { SerialPort } from './serial-port';

describe('SerialPort', () => {
  let service: SerialPort;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerialPort);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
