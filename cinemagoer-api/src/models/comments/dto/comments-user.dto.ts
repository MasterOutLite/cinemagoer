import {ApiProperty} from "@nestjs/swagger";

export class CommentsUserDto {
    @ApiProperty({example: 1, description: 'ID'})
    id: number;

    @ApiProperty({example: 'Vadim23', description: 'Nickname user'})
    nickname: string

    @ApiProperty({example: 'url/img', description: 'Url on img'})
    avatar: string
}
