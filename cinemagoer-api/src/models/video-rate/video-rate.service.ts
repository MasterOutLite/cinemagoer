import {BadRequestException, Injectable} from '@nestjs/common';
import VideoRate from "@models/video-rate/video-rate.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateVideoRateDto} from "@models/video-rate/dto/create-video-rate.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {ResponseVideoRateDto} from "@models/video-rate/dto/response-video-rate.dto";
import Video from "@models/video/video.entity";

@Injectable()
export class VideoRateService {
    constructor(
        @InjectRepository(VideoRate)
        private videoRateRepository: Repository<VideoRate>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
    ) {
    }

    async create(dto: CreateVideoRateDto, auth: TokenFormat) {
        if (!await this.videoRepository.exists({where: {id: dto.videoId}}))
            throw new BadRequestException(`Invalid parameter for video: ${dto.videoId}`);

        const exists = await this.videoRateRepository.findOne({
            where: {
                videoId: dto.videoId,
                userId: auth.id
            }
        });
        if (exists) {
            exists.rate = dto.rate;
            await this.videoRateRepository.update(exists.id, exists);
            return new ResponseVideoRateDto(exists);
        }

        const rate = await this.videoRateRepository.save({...dto, userId: auth.id})
        return new ResponseVideoRateDto(rate);
    }
}
