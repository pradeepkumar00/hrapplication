import { TestBed } from '@angular/core/testing';

import { ClientLogsService } from './client-logs.service';

describe('ClientLogsService', () => {
  let service: ClientLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
