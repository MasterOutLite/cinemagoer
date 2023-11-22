import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";
import {CreateDubbingOfVideoDto} from "@src/dubbing-of-video/dto/create-dubbing-of-video.dto";
import {FilesService, TypeFile} from "@src/files/files.service";
import {ResponseDubbingOfVideoDto} from "@src/dubbing-of-video/dto/response-dubbing-of-video.dto";
import {DubbingStudioService} from "@src/dubbing-studio/dubbing-studio.service";
import {VideoSeriesService} from "@src/video-series/video-series.service";
import {DubbingOfVideoQuery} from "@src/dubbing-of-video/dto/dubbing-of-video.query";
import {Op} from "sequelize";

@Injectable()
export class DubbingOfVideoService {
    constructor(
        @InjectModel(DubbingOfVideo)
        private dubbingOfVideoRepository: typeof DubbingOfVideo,
        private filesService: FilesService,
        private dubbingStudioService: DubbingStudioService,
        private videoSeriesService: VideoSeriesService
    ) {
    }

    async create(dto: CreateDubbingOfVideoDto, video: Express.Multer.File[]) {
        const existsAtr: {
            tag: string,
            exists: boolean
        }[] = [];

        existsAtr.push({tag: 'video', exists: !!video || !!video[0]});
        existsAtr.push({tag: 'dubbingStudioId', exists: await this.dubbingStudioService.exists(dto.dubbingStudioId)});
        existsAtr.push({tag: 'videoSeriesId', exists: await this.videoSeriesService.exists(dto.videoSeriesId)});

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        dto.video = this.filesService.createFile(TypeFile.VIDEO, video[0]);
        const dubbing = await this.dubbingOfVideoRepository.create(dto);
        return new ResponseDubbingOfVideoDto(dubbing);
    }

    async getAll(dto: DubbingOfVideoQuery): Promise<ResponseDubbingOfVideoDto[]> {
        const search: {
            dubbingStudioId?: number,
            videoSeriesId?: any,
        } = {
            dubbingStudioId: dto.dubbingStudioId,
            videoSeriesId: {
                [Op.in]: dto.videoSeriesIds || []
            }
        };

        const dubbings = await this.dubbingOfVideoRepository.findAll({where: {...search}})
        const responses: ResponseDubbingOfVideoDto[] = [];
        for (const dubbing of dubbings) {
            const response = new ResponseDubbingOfVideoDto(dubbing);
            responses.push(response);
        }

        return responses;
    }
}
