import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import VideoCategory from "@src/video-category/video-category.model";
import {CreateVideoCategoryDto} from "@src/video-category/dto/create-video-category.dto";
import {ResponseVideoCategoryDto} from "@src/video-category/dto/response-video-category.dto";

@Injectable()
export class VideoCategoryService {
    constructor(@InjectModel(VideoCategory) private videoCategoryRepository: typeof VideoCategory) {
    }

    async create(dto: CreateVideoCategoryDto): Promise<ResponseVideoCategoryDto> {
        const exists: VideoCategory = await this.videoCategoryRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        const videoCategory = await this.videoCategoryRepository.create(dto);
        return new ResponseVideoCategoryDto(videoCategory);
    }

    async getAll(): Promise<ResponseVideoCategoryDto[]> {
        const videoCategories = await this.videoCategoryRepository.findAll();
        const responseVideoCategoryDtos: ResponseVideoCategoryDto[] = [];

        for (const status of videoCategories) {
            responseVideoCategoryDtos.push(new ResponseVideoCategoryDto(status));
        }

        return responseVideoCategoryDtos;
    }

    async getOne(id: number) {
        const videoCategory: VideoCategory = await this.videoCategoryRepository.findOne({where: {id}});
        return new ResponseVideoCategoryDto(videoCategory);
    }

    async exists(id: number): Promise<boolean> {
        const videoCategory: VideoCategory = await this.videoCategoryRepository.findOne({where: {id}});
        return videoCategory !== null;
    }
}
