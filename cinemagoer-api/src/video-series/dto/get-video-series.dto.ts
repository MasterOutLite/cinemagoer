import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString} from "class-validator";
import {Delete} from "@nestjs/common";
import {Default} from "sequelize-typescript";

export class GetVideoSeriesDto {
    @ApiProperty({example: 1, description: 'Video id owner'})
    @IsNumberString({},{message: 'Is not number'})
    videoId: number;

    @ApiProperty({example:1, description: 'What season id', required: false})
    seasonId: number | null;
}
