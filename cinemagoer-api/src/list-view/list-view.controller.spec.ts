import { Test, TestingModule } from '@nestjs/testing';
import { ListViewController } from './list-view.controller';

describe('ListViewController', () => {
  let controller: ListViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListViewController],
    }).compile();

    controller = module.get<ListViewController>(ListViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
