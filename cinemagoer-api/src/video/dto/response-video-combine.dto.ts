import {ApiProperty} from "@nestjs/swagger";
import {CreateVideoSeriesDto} from "@src/video-series/dto/create-video-series.dto";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {ResponseVideoInfoDto} from "@src/video-info/dto/response-video-info.dto";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";
import {ResponseVideoDto} from "@src/video/dto/response-video.dto";

export class ResponseVideoCombineDto {
    constructor(video: ResponseVideoDto, videoInfo: ResponseVideoInfoDto,
                series?: ResponseVideoSeriesDto[], season?: ResponseSeasonDto[])
    {
        this.video = video;
        this.videoInfo = videoInfo;
        this.series = series;
        this.season = season;
    }

    @ApiProperty({description: 'Response video'})
    video: ResponseVideoDto;

    @ApiProperty({description: 'Response video info'})
    videoInfo: ResponseVideoInfoDto;

    @ApiProperty({type: [CreateVideoSeriesDto], description: 'Response video series', required: false})
    series?: ResponseVideoSeriesDto[];

    @ApiProperty({type: [CreateSeasonDto], description: 'Response video Season', required: false})
    season?: ResponseSeasonDto[];
}
