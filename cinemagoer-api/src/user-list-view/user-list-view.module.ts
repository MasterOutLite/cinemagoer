import {Module} from '@nestjs/common';
import {UserListViewService} from './user-list-view.service';
import {UserListViewController} from './user-list-view.controller';
import UserListView from "@src/user-list-view/user-list-view.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "@src/auth/auth.module";
import ListView from "@src/list-view/list-view.model";
import {VideoModule} from "@src/video/video.module";

@Module({
    providers: [UserListViewService],
    controllers: [UserListViewController],
    imports: [
        SequelizeModule.forFeature([UserListView, ListView]),
        VideoModule,
        AuthModule,
    ],

    exports: [UserListViewService]
})
export class UserListViewModule {
}
