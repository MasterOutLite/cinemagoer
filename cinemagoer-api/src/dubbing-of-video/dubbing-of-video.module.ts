import {Module} from '@nestjs/common';
import {DubbingOfVideoService} from './dubbing-of-video.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {DubbingOfVideoController} from './dubbing-of-video.controller';
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";
import {FilesModule} from "@src/files/files.module";
import {DubbingStudioModule} from "@src/dubbing-studio/dubbing-studio.module";
import {VideoSeriesModule} from "@src/video-series/video-series.module";
import {AuthModule} from "@src/auth/auth.module";

@Module({
    providers: [DubbingOfVideoService],
    imports: [
        SequelizeModule.forFeature([DubbingOfVideo]),
        FilesModule, DubbingStudioModule, VideoSeriesModule, AuthModule
    ],
    controllers: [DubbingOfVideoController],
})
export class DubbingOfVideoModule {
}
