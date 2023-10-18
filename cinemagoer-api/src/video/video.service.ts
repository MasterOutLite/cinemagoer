import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Video from "@src/video/video.model";
import {ResponseVideoDto} from "@src/video/dto/response-video.dto";
import {CreateVideoDto} from "@src/video/dto/create-video.dto";
import {TypeService} from "@src/type/type.service";
import {GenreService} from "@src/genre/genre.service";
import {StatusService} from "@src/status/status.service";
import {VideoCategoryService} from "@src/video-category/video-category.service";
import {PublisherService} from "@src/publisher/publisher.service";
import {AgeRatingService} from "@src/age-rating/age-rating.service";
import {CreateVideoInfoDto} from "@src/video-info/dto/create-video-info.dto";
import {CreateVideoCombineDto} from "@src/video/dto/create-video-combine.dto";
import {VideoInfoService} from "@src/video-info/video-info.service";
import {ResponseVideoInfoDto} from "@src/video-info/dto/response-video-info.dto";
import {FilesService, TypeFile} from "@src/files/files.service";
import {ResponseVideoViewDto} from "@src/video/dto/response-video-view.dto";

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video) private videoRepository: typeof Video,
        private videoInfoService: VideoInfoService,
        private filesService: FilesService,
        private typeService: TypeService,
        private genreService: GenreService,
        private statusService: StatusService,
        private videoCategoryService: VideoCategoryService,
        private publisherService: PublisherService,
        private ageRatingService: AgeRatingService
    ) {
    }

    async create(dto: CreateVideoCombineDto, files): Promise<ResponseVideoViewDto> {
        const videoDto: CreateVideoDto = dto;
        const existsAtr: { tag: string, exists: boolean }[] = [];
        existsAtr.push({tag: 'typeId', exists: await this.typeService.exists(videoDto.typeId)});
        existsAtr.push({tag: 'statusId', exists: await this.statusService.exists(videoDto.statusId)});
        existsAtr.push({tag: 'genreIds', exists: await this.genreService.existsArr(videoDto.genreIds)});
        existsAtr.push({
            tag: 'videoCategoryId',
            exists: await this.videoCategoryService.exists(videoDto.videoCategoryId)
        });
        existsAtr.push({tag: 'publisherId', exists: await this.publisherService.exists(videoDto.publisherId)});
        existsAtr.push({tag: 'ageRatingId', exists: await this.ageRatingService.exists(videoDto.ageRatingId)});

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        if (!Array.isArray(videoDto.name))
            throw new BadRequestException('Param name is not array!');

        if (files.icon && files.icon[0])
            videoDto.icon = this.filesService.createFile(TypeFile.PICTURES, files.icon[0]);

        const video: Video = await this.videoRepository.create(videoDto);
        const videoRes: ResponseVideoDto = new ResponseVideoDto(video);

        const videoInfoDto: CreateVideoInfoDto = dto;
        videoInfoDto.videoId = video.id;
        const videoInfoRes: ResponseVideoInfoDto = await this.videoInfoService.create(videoInfoDto, files.trailers, files.pictures);

        const respose: ResponseVideoViewDto = new ResponseVideoViewDto(videoRes, videoInfoRes);
        return respose;
    }
}
