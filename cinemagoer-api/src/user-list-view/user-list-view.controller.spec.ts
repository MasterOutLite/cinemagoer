import { Test, TestingModule } from '@nestjs/testing';
import { UserListViewController } from './user-list-view.controller';

describe('UserListViewController', () => {
  let controller: UserListViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserListViewController],
    }).compile();

    controller = module.get<UserListViewController>(UserListViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
