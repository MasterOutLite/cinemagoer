import { Test, TestingModule } from '@nestjs/testing';
import { AgeRatingService } from './age-rating.service';

describe('AgeRatingService', () => {
  let service: AgeRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgeRatingService],
    }).compile();

    service = module.get<AgeRatingService>(AgeRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
