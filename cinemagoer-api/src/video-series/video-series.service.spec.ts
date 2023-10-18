import { Test, TestingModule } from '@nestjs/testing';
import { VideoSeriesService } from './video-series.service';

describe('VideoSeriesService', () => {
  let service: VideoSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoSeriesService],
    }).compile();

    service = module.get<VideoSeriesService>(VideoSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
