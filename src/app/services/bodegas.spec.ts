import { TestBed } from '@angular/core/testing';

import { Bodegas } from './bodegas';

describe('Bodegas', () => {
  let service: Bodegas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bodegas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
