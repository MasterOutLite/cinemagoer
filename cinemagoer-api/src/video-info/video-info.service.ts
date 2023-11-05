import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoInfo from "@src/video-info/video-info.model";
import {CreateVideoInfoDto} from "@src/video-info/dto/create-video-info.dto";
import {ResponseVideoInfoDto} from "@src/video-info/dto/response-video-info.dto";
import {FilesService, TypeFile} from "@src/files/files.service";
import {ExistsException} from "@src/exception/ExistsException";
import {UpdateVideoInfoDto} from "@src/video-info/dto/update-video-info.dto";

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

    async update(dto: UpdateVideoInfoDto, trailers: Express.Multer.File[], pictures: Express.Multer.File[]) {
        const videoInfo = await this.videoInfoRepository.findOne({where: {id: dto.id}});
        if (!videoInfo)
            throw new BadRequestException('Not found VideoInfo!');

        const trailersAdd = [];
        if (trailers) {
            for (const trailer of trailers) {
                const name: string = this.fileService.createFile(TypeFile.TRAILER, trailer);
                trailersAdd.push(name);
            }
        }

        const picturesAdd = [];
        if (pictures) {
            for (const picture of pictures) {
                const name: string = this.fileService.createFile(TypeFile.PICTURES, picture);
                picturesAdd.push(name);
            }
        }

        if (dto.mainCharacters && dto.mainCharacters.length > 0)
            videoInfo.mainCharacters = [...videoInfo.mainCharacters, ...dto.mainCharacters]
        if (trailers && trailers.length > 0)
            videoInfo.trailers = [...videoInfo.trailers, ...trailersAdd]
        if (pictures && pictures.length > 0)
            videoInfo.pictures = [...videoInfo.pictures, ...picturesAdd]

        delete dto.pictures;
        delete dto.trailers;
        delete dto.mainCharacters;
        await videoInfo.update(dto);

        return new ResponseVideoInfoDto(videoInfo);
    }

    async get(videoId: number): Promise<ResponseVideoInfoDto> {
        if (!videoId)
            throw new BadRequestException(`Enter number is null or zero: videoId`);

        const videoInfo = await this.videoInfoRepository.findOne({where: {videoId}});
        return new ResponseVideoInfoDto(videoInfo);
    }

}
