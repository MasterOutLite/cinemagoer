import {Module} from '@nestjs/common';
import {DubbingOfVideoService} from './dubbing-of-video.service';
import {DubbingOfVideoController} from './dubbing-of-video.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import DubbingOfVideo from "@models/dubbing-of-video/dubbing-of-video.entity";
import {VideoSeriesModule} from "@models/video-series/video-series.module";
import {DubbingStudioModule} from "@models/dubbing-studio/dubbing-studio.module";
import {FilesModule} from "@src/files/files.module";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";
import VideoSeries from "@models/video-series/video-series.entity";

@Module({
    providers: [DubbingOfVideoService],
    imports: [
        TypeOrmModule.forFeature([DubbingOfVideo, DubbingStudio, VideoSeries]),
        FilesModule, DubbingStudioModule, VideoSeriesModule, AuthModule
    ],
    controllers: [DubbingOfVideoController],
})
export class DubbingOfVideoModule {
}
