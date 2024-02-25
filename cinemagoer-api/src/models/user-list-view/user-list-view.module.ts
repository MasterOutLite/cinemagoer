import {Module} from '@nestjs/common';
import {UserListViewService} from './user-list-view.service';
import {UserListViewController} from './user-list-view.controller';
import {AuthModule} from "@src/auth/auth.module";
import ListView from "@models/list-view/list-view.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import UserListView from "@models/user-list-view/user-list-view.entity";
import {VideoModule} from "@models/video/video.module";
import Video from "@models/video/video.entity";

@Module({
    providers: [UserListViewService],
    controllers: [UserListViewController],
    imports: [
        TypeOrmModule.forFeature([UserListView, ListView, Video]),
        VideoModule,
        AuthModule,
    ],
    exports: [UserListViewService]
})
export class UserListViewModule {
}
