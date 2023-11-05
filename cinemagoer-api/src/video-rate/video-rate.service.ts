import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoRate from "@src/video-rate/video-rate.model";
import {CreateVideoRateDto} from "@src/video-rate/dto/create-video-rate.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {VideoService} from "@src/video/video.service";
import e from "express";
import {ResponseVideoRateDto} from "@src/video-rate/dto/response-video-rate.dto";

@Injectable()
export class VideoRateService {
    constructor(
        @InjectModel(VideoRate)
        private videoRateRepository: typeof VideoRate,
    ) {
    }

    async create(dto: CreateVideoRateDto, auth: TokenFormat) {
        const exists = await this.videoRateRepository.findOne({
            where: {
                videoId: dto.videoId,
                userId: auth.id
            }
        });
        if (exists) {
            await exists.update({rate: dto.rate});
            return new ResponseVideoRateDto(exists);
        }

        const rate = await this.videoRateRepository.create({...dto, userId: auth.id})
        return new ResponseVideoRateDto(rate);
    }
}
