import {Module} from '@nestjs/common';
import {VideoSeriesService} from './video-series.service';
import {VideoSeriesController} from './video-series.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import DayOfWeek from "@models/video-series/day-of-week.entity";
import VideoSeries from "@models/video-series/video-series.entity";
import {SeasonModule} from "@models/season/season.module";
import {VideoModule} from "@models/video/video.module";
import Video from "@models/video/video.entity";
import Season from "@models/season/season.entity";


@Module({
    providers: [VideoSeriesService],
    imports: [
        TypeOrmModule.forFeature([DayOfWeek, VideoSeries, Video, Season]),
        SeasonModule, AuthModule, VideoModule
    ],
    exports: [VideoSeriesService],
    controllers: [VideoSeriesController]
})
export class VideoSeriesModule {
}
