import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'email@email.com', description: 'Email unique user.'})
    @IsEmail({}, {message: 'Is not email!'})
    email: string;

    @ApiProperty({example: 'AnYsUmBoLs', description: 'Password user'})
    @IsString({message: 'String only'})
    @Length(6, 20, {message: 'min: 6 / max: 20'})
    password: string;

    @ApiProperty({example: 'nicknameTon', description: 'nickname user'})
    @IsString({message: 'String only'})
    @Length(4, 20, {message: 'min: 4 / max: 20'})
    nickname: string;

    @ApiProperty({example: [], description: 'nickname user', required: false})
    @IsNumber({}, {each: true})
    @IsOptional()
    roles?: number[];
}
