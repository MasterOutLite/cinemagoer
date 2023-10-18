import {Module} from '@nestjs/common';
import {VideoCategoryService} from './video-category.service';
import {VideoCategoryController} from './video-category.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import VideoCategory from "@src/video-category/video-category.model";

@Module({
  providers: [VideoCategoryService],
  controllers: [VideoCategoryController],
  imports:[
    SequelizeModule.forFeature([VideoCategory]),
  ],
  exports:[
      VideoCategoryService
  ]
})
export class VideoCategoryModule {}
