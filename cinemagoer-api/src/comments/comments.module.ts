import {forwardRef, Module} from '@nestjs/common';
import {CommentsController} from './comments.controller';
import {CommentsService} from './comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Comments from "@src/comments/comments.model";
import {VideoModule} from "@src/video/video.module";
import {UsersModule} from "@users/users.module";
import {AuthModule} from "@src/auth/auth.module";
import {CommentsRateModule} from "@src/comments-rate/comments-rate.module";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [
        SequelizeModule.forFeature([Comments]),
        VideoModule, UsersModule, AuthModule, forwardRef(() => CommentsRateModule)
    ],
    exports: [
        CommentsService
    ],

})
export class CommentsModule {
}
