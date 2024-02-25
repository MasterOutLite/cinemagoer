import {Module} from '@nestjs/common';
import {VideoRateService} from './video-rate.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import VideoRate from "@models/video-rate/video-rate.entity";
import Video from "@models/video/video.entity";

@Module({
    providers: [VideoRateService],
    imports: [
        TypeOrmModule.forFeature([VideoRate, Video]),
    ],
    exports: [
        VideoRateService
    ]
})
export class VideoRateModule {
}
