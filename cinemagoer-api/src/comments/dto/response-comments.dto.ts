import {ApiProperty} from "@nestjs/swagger";
import Comments from "@src/comments/comments.model";

export class ResponseCommentsDto {
    constructor(dto: Comments) {
        this.id = dto.id
        this.userId = dto.userId;
        this.videoId = dto.videoId;
        this.comments = dto.comment;
        this.commentId = dto?.commentId;
        this.userAnswerId = dto?.userAnswerId;
        // @ts-ignore
        this.like = dto.getDataValue('like') || 0;
        // @ts-ignore
        this.dislike = dto.getDataValue('dislike') || 0;
        // @ts-ignore
        this.userLike = dto.getDataValue('userLike') || undefined;
    }

    @ApiProperty({example: 1, description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 1, description: 'ID user'})
    readonly userId: number;

    @ApiProperty({example: 1, description: 'ID video'})
    readonly videoId: number;

    @ApiProperty({example: "I liked the video!!!", description: 'ID video'})
    readonly comments: string;

    @ApiProperty({example: 1, description: 'ID comment main'})
    readonly commentId?: number;

    @ApiProperty({example: 1, description: 'ID answer to user'})
    readonly userAnswerId?: number;

    @ApiProperty({example: false, description: 'User set like or dislike or nothing'})
    readonly userLike?: boolean;

    @ApiProperty({example: 1, description: 'Count like'})
    readonly like: number;

    @ApiProperty({example: 1, description: 'Count dislike'})
    readonly dislike: number;
}
