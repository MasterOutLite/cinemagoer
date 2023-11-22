import { Test, TestingModule } from '@nestjs/testing';
import { DubbingStudioController } from './dubbing-studio.controller';

describe('DubbingStudioController', () => {
  let controller: DubbingStudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DubbingStudioController],
    }).compile();

    controller = module.get<DubbingStudioController>(DubbingStudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
