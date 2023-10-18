import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoInfo from "@src/video-info/video-info.model";
import {CreateVideoInfoDto} from "@src/video-info/dto/create-video-info.dto";
import {ResponseVideoInfoDto} from "@src/video-info/dto/response-video-info.dto";
import {FilesService, TypeFile} from "@src/files/files.service";
import {ExistsException} from "@src/exception/ExistsException";

@Injectable()
export class VideoInfoService {
    constructor(
        @InjectModel(VideoInfo) private videoInfoRepository: typeof VideoInfo,
        private fileService: FilesService
    ) {
    }

    async create(dto: CreateVideoInfoDto, trailers: Express.Multer.File[], pictures: Express.Multer.File[]):
        Promise<ResponseVideoInfoDto> {
        const exists: VideoInfo = await this.videoInfoRepository.findOne({where: {videoId: dto.videoId}})
        if (exists)
            throw new ExistsException();

        dto.trailers = [];
        if (trailers) {
            for (const trailer of trailers) {
                const name: string = this.fileService.createFile(TypeFile.TRAILER, trailer);
                dto.trailers.push(name);
            }
        }

        dto.pictures = [];
        if (pictures) {
            for (const picture of pictures) {
                const name: string = this.fileService.createFile(TypeFile.PICTURES, picture);
                dto.pictures.push(name);
            }
        }

        const videoInfo = await this.videoInfoRepository.create(dto);
        return new ResponseVideoInfoDto(videoInfo);
    }

    async get(videoId: number): Promise<ResponseVideoInfoDto> {
        if (!videoId)
            throw new BadRequestException(`Enter number is null or zero: videoId`);

        const videoInfo = await this.videoInfoRepository.findOne({where: {videoId}});
        return new ResponseVideoInfoDto(videoInfo);
    }

}
