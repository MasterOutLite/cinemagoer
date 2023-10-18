import {Module} from '@nestjs/common';
import {VideoSeriesService} from './video-series.service';
import {SequelizeModule} from "@nestjs/sequelize";
import VideoSeries from "@src/video-series/video-series.model";

@Module({
    providers: [VideoSeriesService],
    imports: [
        SequelizeModule.forFeature([VideoSeries]),
    ],
    exports: [VideoSeriesService]
})
export class VideoSeriesModule {
}
