import {Module} from '@nestjs/common';
import {VideoRateService} from './video-rate.service';
import {SequelizeModule} from "@nestjs/sequelize";
import VideoRate from "@src/video-rate/video-rate.model";

@Module({
    providers: [VideoRateService],
    imports: [
        SequelizeModule.forFeature([VideoRate]),
    ],
    exports: [
        VideoRateService
    ]
})
export class VideoRateModule {
}
