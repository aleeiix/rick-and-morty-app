import { TestBed } from '@angular/core/testing';

import { EpisodeApiService } from './episode-api.service';

describe('EpisodeApiService', () => {
  let service: EpisodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
