import {ApiProperty} from "@nestjs/swagger";

export class ResponseUserDto {
    constructor(id, nickname, roles, avatar) {
        this.id = id;
        this.nickname = nickname;
        this.roles = roles;
        this.avatar = avatar;
    }


    @ApiProperty({example: '1', description: 'ID user'})
    id: number;

    @ApiProperty({example: 'nicknameTon', description: 'nickname user'})
    nickname: string;

    @ApiProperty({example: '[2, 3, 9]', description: 'User role'})
    roles: number[];

    @ApiProperty({example: 'Image avatar', description: 'Image avatar'})
    avatar: string;
}
