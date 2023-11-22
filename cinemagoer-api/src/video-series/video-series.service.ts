import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoSeries from "@src/video-series/video-series.model";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {VideoSeriesQuery} from "@src/video-series/query/video-series.query";
import {SeasonService} from "@src/season/season.service";
import {CreateListSeriesDto} from "@src/video-series/dto/create-list-series.dto";
import {VideoService} from "@src/video/video.service";
import {UpdateListSeriesDto} from "@src/video-series/dto/update-list-series.dto";
import GetSeriesByDayOfWeek from "@src/video-series/query/get-series-by-day-of.week";
import {DayOfWeekEnum} from "@src/const/day-of-week-list";
import {Op} from "sequelize";
import Video from "@src/video/video.model";
import ResponseSeriesDayOfWeekDto from "@src/video-series/dto/response-series-day-of-week.dto";
import Genre from "@src/genre/genre.model";
import AgeRating from "@src/age-rating/age-rating.model";
import Type from "@src/type/type.model";
import Status from "@src/status/status.model";
import VideoCategory from "@src/video-category/video-category.model";
import Publisher from "@src/publisher/publisher.model";
import SeasonOfYear from "@src/video/season-of-year.model";

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

    async getAllByDayOfWeek() {
        const dayOfWeek = [DayOfWeekEnum.Monday, DayOfWeekEnum.Tuesday, DayOfWeekEnum.Wednesday,
            DayOfWeekEnum.Thursday, DayOfWeekEnum.Friday, DayOfWeekEnum.Saturday, DayOfWeekEnum.Sunday]

        const seriesDayOfWeek = [];
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        const dateForWeek = new Date();
        dateForWeek.setUTCDate(date.getDate() + 6);
        dateForWeek.setUTCHours(23, 59, 59, 59);

        // console.log(date.toUTCString() + ' | ' + dateForWeek.toUTCString());

        for (const day of dayOfWeek) {
            const series = await this.videoSeriesRepository.findAll({
                where: {
                    dayShowId: day,
                    dateRelease: {
                        [Op.between]: [date, dateForWeek],
                    }
                },
                include: [
                    {
                        model: Video, include: [
                            {model: Genre},
                            {model: AgeRating},
                            {model: Type},
                            {model: Status},
                            {model: VideoCategory},
                            {model: Publisher},
                            {model: SeasonOfYear},
                        ]
                    }
                ]
            })
            seriesDayOfWeek.push(series);
        }

        const response = [];

        for (const series of seriesDayOfWeek) {
            const resDayOfWeek = series.map(value => new ResponseSeriesDayOfWeekDto(value));
            response.push(resDayOfWeek);
        }


        return response;
    }

    async exists(id: number): Promise<boolean> {
        const series = await this.videoSeriesRepository.findOne({where: {id}});
        return series !== null;
    }
}
