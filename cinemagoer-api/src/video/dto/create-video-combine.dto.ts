import {IntersectionType} from "@nestjs/swagger";
import {CreateVideoInfoDto} from "@src/video-info/dto/create-video-info.dto";
import {CreateVideoDto} from "@src/video/dto/create-video.dto";
import {CreateVideoSeriesDto} from "@src/video-series/dto/create-video-series.dto";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";

export class CreateVideoCombineDto extends IntersectionType(
    CreateVideoDto,
    CreateVideoInfoDto,
) {
    series?: { season: CreateSeasonDto | ResponseSeasonDto, series: CreateVideoSeriesDto[] };
}
