import {BadRequestException, Injectable} from '@nestjs/common';

import {Op} from "sequelize";
import {InjectRepository} from "@nestjs/typeorm";
import DubbingOfVideo from "@models/dubbing-of-video/dubbing-of-video.entity";
import {Repository} from "typeorm";
import {FilesService, TypeFile} from "@src/files/files.service";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";
import VideoSeries from "@models/video-series/video-series.entity";
import {CreateDubbingOfVideoDto} from "@models/dubbing-of-video/dto/create-dubbing-of-video.dto";
import {DubbingOfVideoQuery} from "@models/dubbing-of-video/dto/dubbing-of-video.query";

@Injectable()
export class DubbingOfVideoService {
    constructor(
        @InjectRepository(DubbingOfVideo)
        private dubbingOfVideoRepository: Repository<DubbingOfVideo>,
        private filesService: FilesService,
        @InjectRepository(DubbingStudio)
        private dubbingStudioRepository: Repository<DubbingStudio>,
        @InjectRepository(VideoSeries)
        private videoSeriesRepository: Repository<VideoSeries>
    ) {
    }

    async create(dto: CreateDubbingOfVideoDto, video: Express.Multer.File[]) {
        const existsAtr: {
            tag: string,
            exists: boolean
        }[] = [];

        existsAtr.push({tag: 'video', exists: !!video || !!video[0]});
        existsAtr.push({
            tag: 'dubbingStudioId',
            exists: await this.dubbingStudioRepository.exists({where: {id: dto.dubbingStudioId}})
        });
        existsAtr.push({
            tag: 'videoSeriesId',
            exists: await this.videoSeriesRepository.exists({where: {id: dto.videoSeriesId}})
        });

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        dto.video = this.filesService.createFile(TypeFile.VIDEO, video[0]);
        return await this.dubbingOfVideoRepository.save(dto);
    }

    async getAll(dto: DubbingOfVideoQuery) {
        const search: {
            dubbingStudioId?: number,
            videoSeriesId?: any,
        } = {
            dubbingStudioId: dto.dubbingStudioId,
            videoSeriesId: {
                [Op.in]: dto.videoSeriesIds || []
            }
        };

        return await this.dubbingOfVideoRepository.find({where: {...search}})
    }
}
