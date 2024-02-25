import {IntersectionType} from "@nestjs/swagger";
import {CreateVideoDto} from "@models/video/dto/create-video.dto";
import {CreateVideoInfoDto} from "@models/video-info/dto/create-video-info.dto";
import {CreateSeasonDto} from "@models/season/dto/create-season.dto";
import {ResponseSeasonDto} from "@models/season/dto/response-season.dto";
import {CreateVideoSeriesDto} from "@models/video-series/dto/create-video-series.dto";

export class CreateVideoCombineDto extends IntersectionType(
    CreateVideoDto,
    CreateVideoInfoDto,
) {
    series?: { season?: CreateSeasonDto | ResponseSeasonDto, series: CreateVideoSeriesDto[] };
}
