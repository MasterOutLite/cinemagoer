import {Module} from '@nestjs/common';
import {VideoCategoryService} from './video-category.service';
import {VideoCategoryController} from './video-category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import VideoCategory from "@models/video-category/video-category.entity";

@Module({
    providers: [VideoCategoryService],
    controllers: [VideoCategoryController],
    imports: [
        TypeOrmModule.forFeature([VideoCategory]),
    ],
    exports: [
        VideoCategoryService
    ]
})
export class VideoCategoryModule {
}
