import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsString} from "class-validator";
import Season from "@models/season/season.entity";

export class ResponseSeasonDto {
    constructor(season: Season) {
        this.id = season.id;
        this.name = season.name;
        this.videoId = season.videoId;
        this.number = season.number;
    }


    @ApiProperty({example: '1', description: 'ID'})
    @IsNumberString({}, {message: 'Is not number'})
    id: number;

    @ApiProperty({example: '1', description: 'ID video'})
    @IsNumberString({}, {message: 'Is not number'})
    videoId: number;

    @ApiProperty({example: 'New quest', description: 'Name Season'})
    @IsString({message: 'Is not string'})
    name: string;

    @ApiProperty({example: '1', description: 'Number season'})
    @IsNumberString({}, {message: 'Is not number'})
    number: number;
}
