import { Test, TestingModule } from '@nestjs/testing';
import { UserListViewService } from './user-list-view.service';

describe('UserListViewService', () => {
  let service: UserListViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserListViewService],
    }).compile();

    service = module.get<UserListViewService>(UserListViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
