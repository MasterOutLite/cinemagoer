import { Test, TestingModule } from '@nestjs/testing';
import { CommentsRateService } from './comments-rate.service';

describe('CommentsRateService', () => {
  let service: CommentsRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsRateService],
    }).compile();

    service = module.get<CommentsRateService>(CommentsRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
