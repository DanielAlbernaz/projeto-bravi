import { TestBed } from '@angular/core/testing';

import { RefreshPeopleService } from './refresh-people.service';

describe('RefreshPeopleService', () => {
  let service: RefreshPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
