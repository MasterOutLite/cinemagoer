import { Test, TestingModule } from '@nestjs/testing';
import { VideoSeriesController } from './video-series.controller';

describe('VideoSeriesController', () => {
  let controller: VideoSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoSeriesController],
    }).compile();

    controller = module.get<VideoSeriesController>(VideoSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
