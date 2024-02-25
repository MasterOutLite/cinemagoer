import {ApiProperty} from "@nestjs/swagger";
import {Column} from "sequelize-typescript";
import {IsOptional, IsString, Length} from "class-validator";

export class CreateRoleDto {

    @ApiProperty({example: 'User', description: 'Name role'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({
        example: 'A user role that allows you to save playlists, rate and write comments.',
        description: 'Description of what the role does'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
