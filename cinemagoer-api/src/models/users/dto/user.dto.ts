import {ApiProperty} from "@nestjs/swagger";
import User from "@models/users/users.entity";

export class UserDto {
    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.nickname = user.nickname;
        this.roles = user.role.map(value => value.id);
    }

    @ApiProperty({example: '1', description: 'ID user'})
    id: number;

    @ApiProperty({example: 'email@email.com', description: 'Email unique user.'})
    email: string;

    @ApiProperty({example: 'nicknameTon', description: 'nickname user'})
    nickname: string;

    @ApiProperty({example: '[2, 3, 9]', description: 'User role'})
    roles: number[];
}
