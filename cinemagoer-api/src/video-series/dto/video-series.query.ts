import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional} from "class-validator";

export class VideoSeriesQuery {
    @ApiProperty({example: 1, description: 'Video id owner'})
    @IsNumberString({},{message: 'Is not number'})
    videoId: number;

    @ApiProperty({example:1, description: 'What season id', required: false})
    @IsNumberString({},{message: 'Is not number'})
    @IsOptional()
    seasonId?: number;
}
