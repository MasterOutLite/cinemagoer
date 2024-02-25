import {Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import Video from "@models/video/video.entity";
import SeasonOfYear from "@models/video/season-of-year.entity";
import {AuthModule} from "@src/auth/auth.module";
import {VideoRateModule} from "@models/video-rate/video-rate.module";
import {FilesModule} from "@src/files/files.module";
import {VideoInfoModule} from "@models/video-info/video-info.module";
import {TypeModule} from "@models/type/type.module";
import {PublisherModule} from "@models/publisher/publisher.module";
import {GenreModule} from "@models/genre/genre.module";
import {SeasonModule} from "@models/season/season.module";
import {VideoCategoryModule} from "@models/video-category/video-category.module";
import {AgeRatingModule} from "@models/age-rating/age-rating.module";
import {StatusModule} from "@models/status/status.module";
import {GroupModule} from "@models/group/group.module";
import {ListViewModule} from "@models/list-view/list-view.module";
import Type from "@models/type/type.entity";
import Genre from "@models/genre/genre.entity";
import Status from "@models/status/status.entity";
import VideoCategory from "@models/video-category/video-category.entity";
import Publisher from "@models/publisher/publisher.entity";
import AgeRating from "@models/age-rating/age-rating.entity";
import Group from "@models/group/group.entity";

@Module({
    controllers: [VideoController],
    providers: [VideoService],
    imports: [
        TypeOrmModule.forFeature([Video,  SeasonOfYear,
            Type, Genre, Status, VideoCategory, Publisher, AgeRating, Group]),
        AuthModule,
        VideoRateModule,
        FilesModule, VideoInfoModule,
        SeasonModule, TypeModule,
        GenreModule, PublisherModule, VideoCategoryModule,
        AgeRatingModule, StatusModule, GroupModule, ListViewModule
    ],
    exports: [
        VideoService
    ]
})
export class VideoModule {
}
