import { TestBed } from '@angular/core/testing';

import { Imgbb } from './imgbb';

describe('Imgbb', () => {
  let service: Imgbb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imgbb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
