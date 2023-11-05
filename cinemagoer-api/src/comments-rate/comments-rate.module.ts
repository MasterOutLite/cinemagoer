import {forwardRef, Module} from '@nestjs/common';
import {CommentsRateService} from './comments-rate.service';
import {SequelizeModule} from "@nestjs/sequelize";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import {CommentsModule} from "@src/comments/comments.module";

@Module({
    providers: [CommentsRateService],
    imports: [
        SequelizeModule.forFeature([CommentsRate]),
        forwardRef(()=> CommentsModule)
    ],
    exports: [
        CommentsRateService
    ]
})
export class CommentsRateModule {
}
