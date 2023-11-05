import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from '@src/users/users.module';
import {ConfigModule} from "@nestjs/config";
import {RoleModule} from '@role/role.module';
import {ListViewStateModule} from './list-view-state/list-view-state.module';
import {UserListViewModule} from './user-list-view/user-list-view.module';
import {CommentsModule} from './comments/comments.module';
import {TypeModule} from './type/type.module';
import {StatusModule} from './status/status.module';
import {VideoCategoryModule} from '@src/video-category/video-category.module';
import {PublisherModule} from './publisher/publisher.module';
import {AgeRatingModule} from './age-rating/age-rating.module';
import {GenreModule} from '@src/genre/genre.module';
import {ListViewModule} from './list-view/list-view.module';
import {VideoModule} from './video/video.module';
import {VideoRateModule} from './video-rate/video-rate.module';
import {CommentsRateModule} from './comments-rate/comments-rate.module';
import {VideoInfoModule} from './video-info/video-info.module';
import {DubbingStudioModule} from './dubbing-studio/dubbing-studio.module';
import {VideoSeriesModule} from './video-series/video-series.module';
import {DubbingOfVideoModule} from './dubbing-of-video/dubbing-of-video.module';
import {GroupModule} from './group/group.module';
import {SeasonModule} from './season/season.module';
import {FilesModule} from './files/files.module';
import * as process from "process";
import User from "@users/users.model";
import Role from "@role/role.model";
import UserRole from "@role/user-role.model";
import UserListView from "@src/user-list-view/user-list-view.model";
import ListViewState from "@src/list-view-state/list-view-state.model";
import Video from "@src/video/video.model";
import Type from "@src/type/type.model";
import Status from "@src/status/status.model";
import VideoCategory from "@src/video-category/video-category.model";
import Publisher from "@src/publisher/publisher.model";
import AgeRating from "@src/age-rating/age-rating.model";
import ListView from "@src/list-view/list-view.model";
import Genre from "@src/genre/genre.model";
import VideoGenre from "@src/genre/video-genre.model";
import VideoRate from "@src/video-rate/video-rate.model";
import Comments from "@src/comments/comments.model";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import VideoInfo from "@src/video-info/video-info.model";
import VideoSeries from "@src/video-series/video-series.model";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";
import Group from "@src/group/group.model";
import GroupVideo from "@src/group/group-video.model";
import Season from "@src/season/season.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import { AuthModule } from './auth/auth.module';
import * as path from "path";


@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: `.${process.env.NODE_ENV}.env`}),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Video, Role, UserRole, ListViewState, UserListView, ListView,
                Type, Status, VideoCategory, Publisher, AgeRating, Genre, VideoGenre,
                VideoRate, VideoInfo, VideoSeries, Comments, CommentsRate, Season,
                DubbingStudio, DubbingOfVideo, Group, GroupVideo,
            ],
            autoLoadModels: true,
        }),
        UsersModule,
        RoleModule,
        ListViewStateModule,
        UserListViewModule,
        CommentsModule,
        TypeModule,
        StatusModule,
        VideoCategoryModule,
        PublisherModule,
        AgeRatingModule,
        GenreModule,
        ListViewModule,
        VideoModule,
        VideoRateModule,
        CommentsRateModule,
        VideoInfoModule,
        DubbingStudioModule,
        VideoSeriesModule,
        DubbingOfVideoModule,
        GroupModule,
        SeasonModule,
        FilesModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
