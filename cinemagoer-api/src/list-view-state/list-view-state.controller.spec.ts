import { Test, TestingModule } from '@nestjs/testing';
import { ListViewStateController } from './list-view-state.controller';

describe('ListViewStateController', () => {
  let controller: ListViewStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListViewStateController],
    }).compile();

    controller = module.get<ListViewStateController>(ListViewStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
