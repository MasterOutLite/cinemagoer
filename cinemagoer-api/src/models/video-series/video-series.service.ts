import {BadRequestException, Injectable} from '@nestjs/common';
import {DayOfWeekEnum} from "@src/const/day-of-week-list";
import VideoSeries from "@models/video-series/video-series.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Repository} from "typeorm";
import {CreateListSeriesDto} from "@models/video-series/dto/create-list-series.dto";
import Season from "@models/season/season.entity";
import Video from "@models/video/video.entity";
import {ResponseVideoSeriesDto} from "@models/video-series/dto/response-video-series.dto";
import {UpdateListSeriesDto} from "@models/video-series/dto/update-list-series.dto";
import {VideoSeriesQuery} from "@models/video-series/query/video-series.query";
import ResponseSeriesDayOfWeekDto from "@models/video-series/dto/response-series-day-of-week.dto";


@Injectable()
export class VideoSeriesService {
    constructor(
        @InjectRepository(VideoSeries)
        private videoSeriesRepository: Repository<VideoSeries>,
        @InjectRepository(Season)
        private seasonService: Repository<Season>,
        @InjectRepository(Video)
        private videoService: Repository<Video>
    ) {
    }

    async create(dto: CreateListSeriesDto): Promise<ResponseVideoSeriesDto[]> {
        const exists = await this.videoService.exists({where: {id: dto.videoId}});
        if (!exists)
            throw new BadRequestException(`Not found video: ${dto.videoId}`)

        if (dto.seasonId) {
            const existsSeason = await this.seasonService.findOne({
                where:
                    {
                        id: dto.seasonId
                    }
            });
            if (!existsSeason || existsSeason.videoId !== dto.videoId)
                throw new BadRequestException(`Not found season: ${dto.seasonId}`)
        }

        const seriesData = [];
        for (const seriesDtoElement of dto.series) {
            const update = {...seriesDtoElement, videoId: dto.videoId, seasonId: dto.seasonId || null};
            seriesData.push(update);
        }

        const series = await this.videoSeriesRepository.save(seriesData);
        return series.map(value => new ResponseVideoSeriesDto(value));
    }

    async update(dto: UpdateListSeriesDto) {
        const exists = await this.videoService.exists({where: {id: dto.videoId}});
        if (!exists)
            throw new BadRequestException(`Not found video: ${dto.videoId}`);

        if (dto.seasonId) {
            const existsSeason = await this.seasonService.findOne({where: {id: dto.seasonId}});
            if (!existsSeason || existsSeason.videoId !== dto.videoId)
                throw new BadRequestException(`Not found season: ${dto.seasonId}`)
        }

        const response = [];
        for (const seriesDtoElement of dto.series) {
            const series: VideoSeries = await this.videoSeriesRepository.findOne({where: {id: seriesDtoElement.id}});
            await this.videoSeriesRepository.update(series.id, {...seriesDtoElement, seasonId: dto.seasonId})
            response.push(new ResponseVideoSeriesDto(series));
        }

        return response;
    }

    async getAll(dto: VideoSeriesQuery): Promise<ResponseVideoSeriesDto[]> {
        const videoSeries: VideoSeries[] = await this.videoSeriesRepository.find({where: {...dto}});
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
            const series = await this.videoSeriesRepository.find({
                where: {
                    dayShowId: day,
                    dateRelease: Between(date, dateForWeek)
                },
                relations: {
                    video: true,
                }
                // [
                //     {
                //         model: Video, include: [
                //             {model: Genre},
                //             {model: AgeRating},
                //             {model: Type},
                //             {model: Status},
                //             {model: VideoCategory},
                //             {model: Publisher},
                //             {model: SeasonOfYear},
                //         ]
                //     }
                // ]
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
}
