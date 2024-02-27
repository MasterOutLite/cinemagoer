import {ApiProperty} from "@nestjs/swagger";
import Comments from "@models/comments/comments.entity";
import {CommentsUserDto} from "@models/comments/dto/comments-user.dto";


export class ResponseCommentsDto {
    constructor(dto: Comments) {
        this.id = dto.id
        this.userId = dto.userId;
        this.videoId = dto.videoId;
        this.comments = dto.comment;
        this.commentId = dto?.commentsId;
        this.userAnswerId = dto?.userAnswerId;
        this.user = dto.user;
        this.createdAt = dto.createdAt;


        this.like = parseInt(dto['likeCount'] || 0);
        this.dislike = parseInt(dto['dislikeCount'] || 0);
        const userLike = dto['userLike'];
        this.userLike = userLike === 0 ? 'none' : userLike;
    }

    @ApiProperty({example: 1, description: 'ID'})
    readonly id: number;

    @ApiProperty({example: '2023-06-03', description: 'Create at'})
    readonly createdAt: string;

    @ApiProperty({example: 1, description: 'ID user'})
    readonly userId: number;

    @ApiProperty({example: CommentsUserDto, description: 'User'})
    readonly user: CommentsUserDto;

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
