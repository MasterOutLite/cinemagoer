import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {
    constructor() {
        console.log('create')
    }

    @ApiProperty({example: 'email@email.com', description: 'Email unique user.'})
    @IsEmail({}, {message: 'Is not email!'})
    email: string;

    @ApiProperty({example: 'AnYsUmBoLs', description: 'Password user'})
    @IsString({message: 'String only'})
    password: string;

    @ApiProperty({example: 'nicknameTon', description: 'nickname user'})
    @IsString({message: 'String only'})
    @Length(8, 20, {message: 'min: 8 / max: 20'})
    nickname: string;

    @ApiProperty({description: 'avatar files', format: 'binary'})
    @IsOptional()
    avatar: string;
}
