import { TestBed } from '@angular/core/testing';

import { GameCenterService } from './game-center.service';

describe('GameCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameCenterService = TestBed.get(GameCenterService);
    expect(service).toBeTruthy();
  });
});
