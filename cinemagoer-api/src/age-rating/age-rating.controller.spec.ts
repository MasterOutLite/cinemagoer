import { Test, TestingModule } from '@nestjs/testing';
import { AgeRatingController } from './age-rating.controller';

describe('AgeRatingController', () => {
  let controller: AgeRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgeRatingController],
    }).compile();

    controller = module.get<AgeRatingController>(AgeRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
