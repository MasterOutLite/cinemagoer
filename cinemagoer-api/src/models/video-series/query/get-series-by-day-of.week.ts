import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional} from "class-validator";

export default class GetSeriesByDayOfWeek {
    @ApiProperty({example: '1', description: 'Day when be show series.', required: false})
    @IsNumberString({}, {message: 'Is not number.'})
    @IsOptional()
    readonly dayShowId?: number;

    @ApiProperty({example: '1', description: 'Video category (Film, Cartoon, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    videoCategoryId?: number;
}
