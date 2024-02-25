import {ApiProperty} from "@nestjs/swagger";
import VideoSeries from "@models/video-series/video-series.entity";
import {ResponseVideoDto} from "@models/video/dto/response-video.dto";

export default class ResponseSeriesDayOfWeekDto {
    constructor(series: VideoSeries) {
        this.id = series.id;
        this.videoId = series.videoId;
        this.series = series.series;
        this.name = series.name;
        this.dateRelease = series.dateRelease;
        this.release = series.release;
        this.seasonId = series.seasonId;
        this.dayShowId = series.dayShowId;
        this.video = new ResponseVideoDto(series.video);
    }

    @ApiProperty({example: '1', description: 'ID VideoSeries'})
    id: number;

    @ApiProperty({example: '1', description: 'VideoId'})
    videoId: number;

    @ApiProperty({example: '1', description: 'Day when be show series.'})
    readonly dayShowId: number;

    @ApiProperty({example: '1', description: 'Number series'})
    series: number;

    @ApiProperty({example: 'Again hi!', description: 'Name series'})
    name: string;

    @ApiProperty({example: '20.09.2023', description: 'Data release', format: 'Date'})
    dateRelease: Date;

    @ApiProperty({example: 'false', description: 'Release: yes or no'})
    release: boolean;

    @ApiProperty({example: '1', description: 'SeasonId'})
    seasonId: number;

    @ApiProperty({example: '{}', description: 'SeasonId'})
    video: ResponseVideoDto;
}
