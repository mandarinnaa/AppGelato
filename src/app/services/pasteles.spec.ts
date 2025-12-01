import { TestBed } from '@angular/core/testing';

import { Pasteles } from './pasteles';

describe('Pasteles', () => {
  let service: Pasteles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pasteles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
