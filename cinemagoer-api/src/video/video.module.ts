import {Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import Video from "@src/video/video.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {VideoInfoModule} from "@src/video-info/video-info.module";
import {VideoSeriesModule} from "@src/video-series/video-series.module";
import {SeasonModule} from "@src/season/season.module";
import {TypeModule} from "@src/type/type.module";
import {GenreModule} from "@src/genre/genre.module";
import {PublisherModule} from "@src/publisher/publisher.module";
import {VideoCategoryModule} from "@src/video-category/video-category.module";
import {AgeRatingModule} from "@src/age-rating/age-rating.module";
import {StatusModule} from "@src/status/status.module";
import {FilesModule} from "@src/files/files.module";

@Module({
    controllers: [VideoController],
    providers: [VideoService],
    imports: [
        SequelizeModule.forFeature([Video]),
        FilesModule, VideoInfoModule,
        VideoSeriesModule, SeasonModule, TypeModule,
        GenreModule, PublisherModule, VideoCategoryModule, AgeRatingModule, StatusModule
    ]
})
export class VideoModule {
}
