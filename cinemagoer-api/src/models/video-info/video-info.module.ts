import {Module} from '@nestjs/common';
import {VideoInfoService} from './video-info.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "@src/files/files.module";
import VideoInfo from "@models/video-info/video-info.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: [VideoInfoService],
    imports: [
        TypeOrmModule.forFeature([VideoInfo]),
        FilesModule
    ],
    exports: [VideoInfoService]
})
export class VideoInfoModule {
}
