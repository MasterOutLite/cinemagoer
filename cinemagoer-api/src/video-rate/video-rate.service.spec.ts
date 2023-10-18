import { Test, TestingModule } from '@nestjs/testing';
import { VideoRateService } from './video-rate.service';

describe('VideoRateService', () => {
  let service: VideoRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoRateService],
    }).compile();

    service = module.get<VideoRateService>(VideoRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
