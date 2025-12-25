import { TestBed } from '@angular/core/testing';

import { LayoutLoader } from './layout-loader';

describe('LayoutLoader', () => {
  let service: LayoutLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
