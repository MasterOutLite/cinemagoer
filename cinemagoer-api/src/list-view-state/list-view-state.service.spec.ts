import { Test, TestingModule } from '@nestjs/testing';
import { ListViewStateService } from './list-view-state.service';

describe('ListViewStateService', () => {
  let service: ListViewStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListViewStateService],
    }).compile();

    service = module.get<ListViewStateService>(ListViewStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
