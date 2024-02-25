import {ApiProperty} from "@nestjs/swagger";
import CommentsRate from "@models/comments-rate/comments-rate.entity";

export enum StateRate {
    create = 'create',
    update = 'update',
    remove = 'remove',
}

export class ResponseCommentRateDto {
    constructor(entity: CommentsRate, state: StateRate) {
        this.rate = entity.rate
        this.commentId = entity.commentsId;
        this.state = state;
    }

    @ApiProperty({example: 1, description: 'Comment id'})
    commentId: number;

    @ApiProperty({example: 'create', description: 'Comment state'})
    state: string;

    @ApiProperty({example: true, description: 'Like(tre) or hate(false)'})
    rate: boolean
}
