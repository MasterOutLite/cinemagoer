import { Module } from '@nestjs/common';
import { UserListViewService } from './user-list-view.service';
import { UserListViewController } from './user-list-view.controller';
import User from "@users/users.model";
import UserListView from "@src/user-list-view/user-list-view.model";
import ListViewState from "@src/list-view-state/list-view-state.model";

@Module({
  providers: [UserListViewService],
  controllers: [UserListViewController],
  imports: [UserListView,User, ListViewState]
})
export class UserListViewModule {}
