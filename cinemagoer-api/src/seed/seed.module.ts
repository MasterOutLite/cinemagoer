import {Module} from '@nestjs/common';
import {SeedService} from './seed.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Type from "@src/type/type.model";
import Role from "@role/role.model";
import User from "@users/users.model";
import Video from "@src/video/video.model";
import UserRole from "@role/user-role.model";
import ListViewState from "@src/list-view-state/list-view-state.model";
import UserListView from "@src/user-list-view/user-list-view.model";
import ListView from "@src/list-view/list-view.model";
import Status from "@src/status/status.model";
import VideoCategory from "@src/video-category/video-category.model";
import Publisher from "@src/publisher/publisher.model";
import AgeRating from "@src/age-rating/age-rating.model";
import Genre from "@src/genre/genre.model";
import VideoGenre from "@src/genre/video-genre.model";
import VideoRate from "@src/video-rate/video-rate.model";
import VideoInfo from "@src/video-info/video-info.model";
import VideoSeries from "@src/video-series/video-series.model";
import Comments from "@src/comments/comments.model";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import Season from "@src/season/season.model";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";
import Group from "@src/group/group.model";
import GroupVideo from "@src/group/group-video.model";
import {UsersModule} from "@users/users.module";
import {FilesModule} from "@src/files/files.module";
import {VideoModule} from "@src/video/video.module";
import {AuthModule} from "@src/auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {VideoSeriesModule} from "@src/video-series/video-series.module";
import DayOfWeek from "@src/video-series/day-of-week.model";
import SeasonOfYear from "@src/video/season-of-year.model";

@Module({
    providers: [SeedService],
    imports: [
        SequelizeModule.forFeature([User, Video, Role, UserRole, ListViewState, UserListView, ListView,
            Type, Status, VideoCategory, Publisher, AgeRating, Genre, VideoGenre,
            VideoRate, VideoInfo, VideoSeries, Comments, CommentsRate, Season,
            DubbingStudio, DubbingOfVideo, Group, GroupVideo, DayOfWeek, SeasonOfYear]),
        UsersModule, FilesModule, VideoModule, AuthModule, JwtModule, VideoSeriesModule
    ],
    exports: [SeedService]
})
export class SeedModule {
}
