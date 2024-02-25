import {Module} from '@nestjs/common';
import {CommentsController} from './comments.controller';
import {CommentsService} from './comments.service';
import Comments from "@models/comments/comments.entity";
import {VideoModule} from "@models/video/video.module";
import {UsersModule} from "@models/users/users.module";
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Video from "@models/video/video.entity";
import Users from "@models/users/users.entity";
import CommentsRate from "@models/comments-rate/comments-rate.entity";
import {CommentsRateModule} from "@models/comments-rate/comments-rate.module";


@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [
        TypeOrmModule.forFeature([Comments, Video, Users, CommentsRate]),
        VideoModule, UsersModule, AuthModule, CommentsRateModule
    ],
    exports: [
        CommentsService
    ],

})
export class CommentsModule {
}
