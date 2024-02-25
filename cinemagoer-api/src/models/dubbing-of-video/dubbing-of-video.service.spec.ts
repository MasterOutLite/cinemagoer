import { Test, TestingModule } from '@nestjs/testing';
import { DubbingOfVideoService } from './dubbing-of-video.service';

describe('DubbingOfVideoService', () => {
  let service: DubbingOfVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DubbingOfVideoService],
    }).compile();

    service = module.get<DubbingOfVideoService>(DubbingOfVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
