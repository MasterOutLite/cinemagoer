import { Test, TestingModule } from '@nestjs/testing';
import { DubbingOfVideoController } from './dubbing-of-video.controller';

describe('DubbingOfVideoController', () => {
  let controller: DubbingOfVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DubbingOfVideoController],
    }).compile();

    controller = module.get<DubbingOfVideoController>(DubbingOfVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
