import {ApiProperty} from "@nestjs/swagger";
import {ResponseVideoDto} from "@models/video/dto/response-video.dto";
import {ResponseVideoInfoDto} from "@models/video-info/dto/response-video-info.dto";
import {ResponseVideoSeriesDto} from "@models/video-series/dto/response-video-series.dto";
import {ResponseSeasonDto} from "@models/season/dto/response-season.dto";
import {CreateVideoSeriesDto} from "@models/video-series/dto/create-video-series.dto";
import {CreateSeasonDto} from "@models/season/dto/create-season.dto";

export class ResponseVideoCombineDto {
    constructor(video: ResponseVideoDto, videoInfo: ResponseVideoInfoDto,
                series?: ResponseVideoSeriesDto[], season?: ResponseSeasonDto[]) {
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
