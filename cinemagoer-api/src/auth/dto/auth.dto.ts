import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class AuthDto {

    @ApiProperty({example:'email@email.com', description:'Login user'})
    @IsString()
    login: string;

    @ApiProperty({example:'AnYsUmBoLs', description:'Password user'})
    @IsString()
    password: string;
}
