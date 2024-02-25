import {ApiProperty} from "@nestjs/swagger";
import User from "@models/users/users.entity";

export class ResponseUserDto {
    constructor(entity: User) {
        this.id = entity.id;
        this.nickname = entity.nickname;
        this.roles = entity.role.map(value => value.id);
        this.avatar = entity.avatar;
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
