import { Module } from '@nestjs/common';
import { ListViewStateController } from './list-view-state.controller';
import { ListViewStateService } from './list-view-state.service';
import ListViewState from "@src/list-view-state/list-view-state.model";
import UserListView from "@src/user-list-view/user-list-view.model";

@Module({
  controllers: [ListViewStateController],
  providers: [ListViewStateService],
  imports:[ListViewState, UserListView]
})
export class ListViewStateModule {}
