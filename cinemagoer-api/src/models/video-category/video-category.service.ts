import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateVideoCategoryDto} from "@models/video-category/dto/create-video-category.dto";
import VideoCategory from "@models/video-category/video-category.entity";
import {ResponseVideoCategoryDto} from "@models/video-category/dto/response-video-category.dto";

@Injectable()
export class VideoCategoryService {
    constructor(@InjectRepository(VideoCategory)
                private videoCategoryRepository: Repository<VideoCategory>) {
    }

    async create(dto: CreateVideoCategoryDto): Promise<ResponseVideoCategoryDto> {
        const exists: VideoCategory = await this.videoCategoryRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        return await this.videoCategoryRepository.save(dto);
    }

    async getAll(): Promise<ResponseVideoCategoryDto[]> {
        return await this.videoCategoryRepository.find();
    }

}
