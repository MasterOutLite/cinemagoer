import {Module} from '@nestjs/common';
import {VideoInfoService} from './video-info.service';
import {SequelizeModule} from "@nestjs/sequelize";
import VideoInfo from "@src/video-info/video-info.model";
import {FilesModule} from "@src/files/files.module";

@Module({
    providers: [VideoInfoService],
    imports: [
        SequelizeModule.forFeature([VideoInfo]),
        FilesModule
    ],
    exports: [VideoInfoService]
})
export class VideoInfoModule {
}
