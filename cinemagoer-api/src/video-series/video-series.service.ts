import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoSeries from "@src/video-series/video-series.model";
import {CreateVideoSeriesDto} from "@src/video-series/dto/create-video-series.dto";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {GetVideoSeriesDto} from "@src/video-series/dto/get-video-series.dto";

@Injectable()
export class VideoSeriesService {
    constructor(
        @InjectModel(VideoSeries)
        private videoSeriesRepository: typeof VideoSeries
    ) {
    }

    async create(dto: CreateVideoSeriesDto): Promise<ResponseVideoSeriesDto> {
        const series: VideoSeries = await this.videoSeriesRepository.create(dto);
        return new ResponseVideoSeriesDto(series);
    }

    async getAll(dto: GetVideoSeriesDto) {
        const videoSerieses: VideoSeries[] = await this.videoSeriesRepository.findAll({where: {...dto}});
        const resVideoSerieses: ResponseVideoSeriesDto[] = [];
        for (const videoSeries of videoSerieses) {
            const resVideoSeries: ResponseVideoSeriesDto = new ResponseVideoSeriesDto(videoSeries);
            resVideoSerieses.push(resVideoSeries);
        }

        return resVideoSerieses;
    }
}
