import {Module} from '@nestjs/common';
import {VideoSeriesService} from './video-series.service';
import {SequelizeModule} from "@nestjs/sequelize";
import VideoSeries from "@src/video-series/video-series.model";
import {SeasonModule} from "@src/season/season.module";
import {VideoSeriesController} from './video-series.controller';
import {AuthModule} from "@src/auth/auth.module";
import {VideoModule} from "@src/video/video.module";
import DayOfWeek from "@src/video-series/day-of-week.model";

@Module({
    providers: [VideoSeriesService],
    imports: [
        SequelizeModule.forFeature([DayOfWeek,VideoSeries]),
        SeasonModule, AuthModule, VideoModule
    ],
    exports: [VideoSeriesService],
    controllers: [VideoSeriesController]
})
export class VideoSeriesModule {
}
