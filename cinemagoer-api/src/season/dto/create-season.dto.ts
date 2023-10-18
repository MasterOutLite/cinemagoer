import {IsNumberString, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSeasonDto {
    @ApiProperty({example: '1', description: 'ID video'})
    @IsNumberString({},{message: 'Is not number'})
    readonly videoId: number;

    @ApiProperty({example: 'New quest', description: 'Name Season'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({example: '1', description: 'Number season'})
    @IsNumberString({},{message: 'Is not number'})
    readonly number: number;
}
