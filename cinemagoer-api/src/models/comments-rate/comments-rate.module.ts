import {forwardRef, Module} from '@nestjs/common';
import {CommentsRateService} from './comments-rate.service';
import CommentsRate from "@models/comments-rate/comments-rate.entity";
import {CommentsModule} from "@models/comments/comments.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Comments from "@models/comments/comments.entity";

@Module({
    providers: [CommentsRateService],
    imports: [
        TypeOrmModule.forFeature([CommentsRate, Comments]),
        forwardRef(() => CommentsModule)
    ],
    exports: [
        CommentsRateService
    ]
})
export class CommentsRateModule {
}
