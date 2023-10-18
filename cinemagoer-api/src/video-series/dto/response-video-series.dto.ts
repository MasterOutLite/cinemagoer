import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsDate, IsNumberString, IsString} from "class-validator";
import VideoSeries from "@src/video-series/video-series.model";

export class ResponseVideoSeriesDto {
    constructor(series: VideoSeries) {
        this.id = series.id;
        this.videoId = series.videoId;
        this.series = series.series;
        this.name = series.name;
        this.dateRelease = series.dateRelease;
        this.release = series.release;
        this.seasonId = series.seasonId;
    }

    @ApiProperty({example: '1', description: 'ID VideoSeries'})
    @IsNumberString({}, {message: 'Is not number.'})
    id: number;

    @ApiProperty({example: '1', description: 'VideoId'})
    @IsNumberString({}, {message: 'Is not number.'})
    videoId: number;

    @ApiProperty({example: '1', description: 'Number series'})
    @IsNumberString({}, {message: 'Is not number.'})
    series: number;

    @ApiProperty({example: 'Again hi!', description: 'Name series'})
    @IsString({message: 'Is not string.'})
    name: string;

    @ApiProperty({example: '20.09.2023', description: 'Data release', format: 'Date'})
    @IsDate({message: 'Is not date.'})
    dateRelease: Date;

    @ApiProperty({example: 'false', description: 'Release: yes or no'})
    @IsBoolean({message: 'Is not bool.'})
    release: boolean;

    @ApiProperty({example: '1', description: 'SeasonId'})
    @IsNumberString({}, {message: 'Is not number.'})
    seasonId: number;
}
