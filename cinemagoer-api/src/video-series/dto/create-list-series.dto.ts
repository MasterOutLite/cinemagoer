import {CreateVideoSeriesDto} from "@src/video-series/dto/create-video-series.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsNumberString, IsOptional,} from "class-validator";

export class CreateListSeriesDto {

    @ApiProperty({example: "1", description: 'VideoId'})
    @IsNumber({}, {message: 'Is not number.'})
    videoId: number;

    @ApiProperty({example: '1', description: 'SeasonId'})
    @IsNumber({}, {message: 'Is not number.'})
    @IsOptional()
    readonly seasonId?: number;

    @ApiProperty({
        example: [
            {
                "series": 1,
                "name": "Again hi!",
                "dateRelease": "2023-09-03",
                "release": false,
            }
        ],
        description: 'VideoId'
    })
    @IsArray()
    readonly series: CreateVideoSeriesDto[];
}
