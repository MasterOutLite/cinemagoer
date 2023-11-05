import {ApiProperty} from "@nestjs/swagger";
import CommentsRate from "@src/comments-rate/comments-rate.model";

export class ResponseCommentRateDto {
    constructor(entity: CommentsRate) {
        this.rate = entity.rate
        this.commentId = entity.commentId;
    }

    @ApiProperty({example: 1, description: 'Comment id'})
    commentId: number;

    @ApiProperty({example: true, description: 'Like(tre) or hate(false)'})
    rate: boolean
}
