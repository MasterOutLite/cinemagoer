import { Test, TestingModule } from '@nestjs/testing';
import { VideoCategoryController } from './video-category.controller';

describe('TypeVideoController', () => {
  let controller: VideoCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoCategoryController],
    }).compile();

    controller = module.get<VideoCategoryController>(VideoCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
