import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoSeries from "@src/video-series/video-series.model";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {VideoSeriesQuery} from "@src/video-series/dto/video-series.query";
import {SeasonService} from "@src/season/season.service";
import {CreateListSeriesDto} from "@src/video-series/dto/create-list-series.dto";
import {VideoService} from "@src/video/video.service";
import {UpdateListSeriesDto} from "@src/video-series/dto/update-list-series.dto";

@Injectable()
export class VideoSeriesService {
    constructor(
        @InjectModel(VideoSeries)
        private videoSeriesRepository: typeof VideoSeries,
        private seasonService: SeasonService,
        private videoService: VideoService
    ) {
    }

    async create(dto: CreateListSeriesDto): Promise<ResponseVideoSeriesDto[]> {
        const exists = await this.videoService.exists(dto.videoId);
        if (!exists)
            throw new BadRequestException(`Not found video: ${dto.videoId}`)

        if (dto.seasonId) {
            const existsSeason = await this.seasonService.getOne(dto.seasonId);
            if (!existsSeason || existsSeason.videoId !== dto.videoId)
                throw new BadRequestException(`Not found season: ${dto.seasonId}`)
        }

        const response = [];
        for (const seriesDtoElement of dto.series) {
            const update = {...seriesDtoElement, videoId: dto.videoId, seasonId: dto.seasonId || null};
            const series: VideoSeries = await this.videoSeriesRepository.create(update);
            response.push(new ResponseVideoSeriesDto(series));
        }

        return response;
    }

    async update(dto: UpdateListSeriesDto) {
        const exists = await this.videoService.exists(dto.videoId);
        if (!exists)
            throw new BadRequestException(`Not found video: ${dto.videoId}`);

        if (dto.seasonId) {
            const existsSeason = await this.seasonService.getOne(dto.seasonId);
            if (!existsSeason || existsSeason.videoId !== dto.videoId)
                throw new BadRequestException(`Not found season: ${dto.seasonId}`)
        }

        const response = [];
        for (const seriesDtoElement of dto.series) {
            const series: VideoSeries = await this.videoSeriesRepository.findOne({where: {id: seriesDtoElement.id}});
            await series.update({
                ...seriesDtoElement,
                seasonId: dto.seasonId
            })
            response.push(new ResponseVideoSeriesDto(series));
        }

        return response;
    }

    async getAll(dto: VideoSeriesQuery): Promise<ResponseVideoSeriesDto[]> {
        const videoSeries: VideoSeries[] = await this.videoSeriesRepository.findAll({where: {...dto}});
        const response: ResponseVideoSeriesDto[] = [];
        for (const series of videoSeries) {
            const resVideoSeries: ResponseVideoSeriesDto = new ResponseVideoSeriesDto(series);
            response.push(resVideoSeries);
        }

        return response;
    }
}
