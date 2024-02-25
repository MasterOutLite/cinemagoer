import {IsNumber, IsNumberString, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateSeasonDto {
    @ApiProperty({example: '1', description: 'ID video'})
    @IsNumber({},{message: 'Is not number'})
    readonly videoId: number;

    @ApiProperty({example: 'New quest', description: 'Name Season'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({example: '1', description: 'Number season'})
    @IsNumber({},{message: 'Is not number'})
    readonly number: number;
}
