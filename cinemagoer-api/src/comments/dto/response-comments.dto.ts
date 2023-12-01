import {ApiProperty} from "@nestjs/swagger";
import Comments from "@src/comments/comments.model";
import {UserDto} from "@users/dto/user.dto";
import {ResponseUserDto} from "@users/dto/response-user.dto";

export class ResponseCommentsDto {
    constructor(dto: Comments) {
        this.id = dto.id
        this.userId = dto.userId;
        this.videoId = dto.videoId;
        this.comments = dto.comment;
        this.commentId = dto?.commentId;
        this.userAnswerId = dto?.userAnswerId;
        this.user = new ResponseUserDto(dto.user);
        this.createdAt = dto.createdAt;
        // @ts-ignore
        this.like = parseInt(dto.getDataValue('like') || 0);
        // @ts-ignore
        this.dislike = parseInt(dto.getDataValue('dislike') || 0);
        // @ts-ignore
        const userLike = dto.getDataValue('userLike');
        this.userLike = userLike === null ? 'none' : userLike;
    }

    @ApiProperty({example: 1, description: 'ID'})
    readonly id: number;

    @ApiProperty({example: '2023-06-03', description: 'Create at'})
    readonly createdAt: string;

    @ApiProperty({example: 1, description: 'ID user'})
    readonly userId: number;

    @ApiProperty({example: {}, description: 'User'})
    readonly user: ResponseUserDto;

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
