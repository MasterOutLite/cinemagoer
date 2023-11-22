import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Video from "@src/video/video.model";
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
import {ResponseVideoCombineDto} from "@src/video/dto/response-video-combine.dto";
import VideoGenre from "@src/genre/video-genre.model";
import {GroupService} from "@src/group/group.service";
import {FilterVideoQuery} from "@src/video/query/filter-video.query";
import Genre from "@src/genre/genre.model";
import {col, fn, literal, Op, where} from "sequelize";
import AgeRating from "@src/age-rating/age-rating.model";
import Type from "@src/type/type.model";
import Status from "@src/status/status.model";
import VideoCategory from "@src/video-category/video-category.model";
import Publisher from "@src/publisher/publisher.model";
import {ResponseVideoDto} from "@src/video/dto/response-video.dto";
import {ResponseCountVideoDto} from "@src/video/dto/response-count-video.dto";
import {SearchVideoQuery} from "@src/video/query/search-video.query";
import {UpdateVideoDto} from "@src/video/dto/update-video.dto";
import {GetVideoQuery} from "@src/video/query/get-video.query";
import VideoInfo from "@src/video-info/video-info.model";
import VideoSeries from "@src/video-series/video-series.model";
import Season from "@src/season/season.model";
import Group from "@src/group/group.model";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {CreateVideoRateDto} from "@src/video-rate/dto/create-video-rate.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {VideoRateService} from "@src/video-rate/video-rate.service";
import SeasonOfYear from "@src/video/season-of-year.model";

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video) private videoRepository: typeof Video,
        @InjectModel(VideoGenre) private videoGenreRepository: typeof VideoGenre,
        private videoInfoService: VideoInfoService,
        private filesService: FilesService,
        private typeService: TypeService,
        private genreService: GenreService,
        private statusService: StatusService,
        private videoCategoryService: VideoCategoryService,
        private publisherService: PublisherService,
        private ageRatingService: AgeRatingService,
        private groupService: GroupService,
        private videoRateService: VideoRateService,
    ) {
    }

    async createRate(dto: CreateVideoRateDto, auth: TokenFormat) {
        const exists = await this.exists(dto.videoId);
        if (!exists)
            throw new BadRequestException('Video is bad!');
        return await this.videoRateService.create(dto, auth);
    }

    async create(dto: CreateVideoCombineDto, files): Promise<ResponseVideoCombineDto> {
        const videoDto: CreateVideoDto = dto;

        const existsAtr: {
            tag: string,
            exists: boolean
        }[] = [];
        existsAtr.push({tag: 'seasonOfYearId', exists: dto.seasonOfYearId <= 4 && dto.seasonOfYearId >= 1});
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

        if (videoDto.groupId) {
            const exists = await this.groupService.exists(videoDto.groupId);
            if (!exists)
                throw new BadRequestException('Request param groupId is not exists.');
        }

        if (!Array.isArray(videoDto.name))
            throw new BadRequestException('Param name is not array!');

        if (files.icon && files.icon[0])
            videoDto.icon = this.filesService.createFile(TypeFile.PICTURES, files.icon[0]);

        const video: Video = await this.videoRepository.create(videoDto);
        await video.$set('genre', videoDto.genreIds);
        if (videoDto.groupId)
            await video.$set('group', videoDto.groupId);

        await video.reload({
            include: [
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: SeasonOfYear},
            ],
        });
        const videoRes: ResponseVideoDto = new ResponseVideoDto(video);


        const videoInfoDto: CreateVideoInfoDto = dto;
        videoInfoDto.videoId = video.id;
        const videoInfoRes: ResponseVideoInfoDto = await this.videoInfoService.create(videoInfoDto, files.trailers, files.pictures);

        return new ResponseVideoCombineDto(videoRes, videoInfoRes);
    }

    async update(dto: UpdateVideoDto, files) {
        const video = await this.videoRepository.findOne({where: {id: dto.id}});
        if (!video)
            throw new BadRequestException('Video id is bad!');

        const existsAtr: {
            tag: string,
            exists: boolean
        }[] = [];
        if (dto.seasonOfYearId)
            existsAtr.push({tag: 'seasonOfYearId', exists: dto.seasonOfYearId <= 4 && dto.seasonOfYearId >= 1});
        if (dto.typeId)
            existsAtr.push({tag: 'typeId', exists: await this.typeService.exists(dto.typeId)});
        if (dto.statusId)
            existsAtr.push({tag: 'statusId', exists: await this.statusService.exists(dto.statusId)});
        if (dto.genreIds)
            existsAtr.push({tag: 'genreIds', exists: await this.genreService.existsArr(dto.genreIds)});
        if (dto.videoCategoryId)
            existsAtr.push({
                tag: 'videoCategoryId',
                exists: await this.videoCategoryService.exists(dto.videoCategoryId)
            });
        if (dto.publisherId)
            existsAtr.push({tag: 'publisherId', exists: await this.publisherService.exists(dto.publisherId)});
        if (dto.ageRatingId)
            existsAtr.push({tag: 'ageRatingId', exists: await this.ageRatingService.exists(dto.ageRatingId)});
        if (dto.groupId)
            existsAtr.push({tag: 'groupId', exists: await this.groupService.exists(dto.groupId)});

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        if (files.icon && files.icon[0]) {
            if (video.icon)
                this.filesService.removeFile(video.icon);
            dto.icon = this.filesService.createFile(TypeFile.PICTURES, files.icon[0]);
        }

        if (dto.genreIds)
            await video.$set('genre', dto.genreIds);
        if (dto.groupId)
            await video.$set('group', dto.groupId);
        await video.update(dto);

        await video.reload({
            include: [
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: SeasonOfYear},
            ],
        });
        return new ResponseVideoDto(video)
    }

    async getVideoByFilter(dto: FilterVideoQuery, auth: TokenFormat) {
        const search = {
            ...dto
        }
        delete search.dateReleaseMax;
        delete search.dateReleaseMin;
        delete search.genreIds;
        delete search.limit;
        delete search.page;

        const limitRows = dto.limit || 20;
        let searchVideoByGenre = undefined;
        const searchByData = {
            dateRelease: {
                [Op.between]: [dto.dateReleaseMin || new Date('1968'), dto.dateReleaseMax || new Date()]
            },
        }

        if (dto.genreIds) {
            const
                contains = await this.videoGenreRepository.findAll({
                    attributes: ['videoId'],
                    where: {
                        genreId: {
                            [Op.in]: dto.genreIds,
                        },
                    },
                    group: 'videoId',
                    having: where(fn('COUNT', col('genreId')), dto.genreIds.length),
                });
            searchVideoByGenre = {
                id: {
                    [Op.in]: contains.map(value => value.videoId)
                },
            }
        }

        const videos = await this.videoRepository.findAndCountAll({
            attributes: {
                include: [
                    [literal('(SELECT AVG("rate") FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id")'), 'avgRate'],
                    [literal(`(SELECT "rate" FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id" and  "video-rate"."userId" = ${auth ? auth.id : 0})`), 'yourRate']
                ]
            },
            where: {
                ...searchVideoByGenre,
                ...search,
                ...searchByData,
            },
            include: [
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: SeasonOfYear},
            ],
            limit: limitRows,
            offset: dto.page * limitRows,
            distinct: true,
            order: [
                ['id', 'ASC']
            ],

        });
        const responses: ResponseVideoDto[] = []
        for (const video of videos.rows) {
            const response = new ResponseVideoDto(video);
            responses.push(response);
        }

        return new ResponseCountVideoDto(videos.count, dto.page, responses);
    }

    async getVideoByName(dto: SearchVideoQuery, auth: TokenFormat) {
        console.log(dto.name)
        const limitRows = dto.limit || 20;
        const videos = await this.videoRepository.findAndCountAll({
            attributes: {
                include: [
                    [literal('(SELECT AVG("rate") FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id")'), 'avgRate'],
                    [literal(`(SELECT "rate" FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id" and "video-rate"."userId" = ${auth ? auth.id : 0})`), 'yourRate']
                ]
            },
            where: literal(
                `EXISTS (SELECT 1
            FROM unnest("Video"."name") AS elem
            WHERE elem ILIKE '%${dto.name}%') and "Video"."videoCategoryId"=${dto.videoCategoryId}`
            ),
            include: [
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: SeasonOfYear},
            ],
            limit: limitRows,
            offset: dto.page * limitRows,
            distinct: true,
            order: [
                ['id', 'ASC']
            ]
        });

        const responses: ResponseVideoDto[] = []
        for (const video of videos.rows) {
            const response = new ResponseVideoDto(video);
            responses.push(response);
        }
        return new ResponseCountVideoDto(videos.count, dto.page, responses);
    }


    async get(dto: GetVideoQuery, auth: TokenFormat) {
        const video = await this.videoRepository.findOne({
            attributes: {
                include: [
                    [literal('(SELECT AVG("rate") FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id")'), 'avgRate'],
                    [literal(`(SELECT "rate" FROM "video-rate" WHERE "video-rate"."videoId" = "Video"."id" and "video-rate"."userId" = ${auth ? auth.id : 0})`), 'yourRate']
                ]
            },
            where: {id: dto.id,},
            include: [
                {model: VideoInfo},
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: Group},
                {model: VideoSeries},
                {model: Season},
                {model: SeasonOfYear},

            ],
        });
        if (!video)
            throw new BadRequestException('Video id is bad!');

        const resVideo = new ResponseVideoDto(video);
        const resInfo = new ResponseVideoInfoDto(video.videoInfo);
        const resSeries = video.videoSeries.map(value => new ResponseVideoSeriesDto(value));
        const resSeason = video.season.map(value => new ResponseSeasonDto(value));

        return new ResponseVideoCombineDto(resVideo, resInfo, resSeries, resSeason);
    }

    async exists(id: number): Promise<boolean> {
        const video
            :
            Video = await this.videoRepository.findOne({where: {id}})
        return video !== null;
    }

    // seed fun

    async createSeed(dto: CreateVideoCombineDto): Promise<ResponseVideoCombineDto> {
        const videoDto: CreateVideoDto = dto;

        const existsAtr: {
            tag: string,
            exists: boolean
        }[] = [];
        existsAtr.push({tag: 'seasonOfYearId', exists: dto.seasonOfYearId <= 4 && dto.seasonOfYearId >= 1});
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

        if (videoDto.groupId) {
            const exists = await this.groupService.exists(videoDto.groupId);
            if (!exists)
                throw new BadRequestException('Request param groupId is not exists.');
        }

        if (!Array.isArray(videoDto.name))
            throw new BadRequestException('Param name is not array!');

        if (dto.icon)
            videoDto.icon = this.filesService.createFileSimple(TypeFile.PICTURES, dto.icon);

        const video: Video = await this.videoRepository.create(videoDto);
        await video.$set('genre', videoDto.genreIds);
        if (videoDto.groupId)
            await video.$set('group', videoDto.groupId);

        await video.reload({
            include: [
                {model: Genre},
                {model: AgeRating},
                {model: Type},
                {model: Status},
                {model: VideoCategory},
                {model: Publisher},
                {model: SeasonOfYear},
            ],
        });
        const videoRes: ResponseVideoDto = new ResponseVideoDto(video);


        const videoInfoDto: CreateVideoInfoDto = dto;
        videoInfoDto.videoId = video.id;
        const videoInfoRes: ResponseVideoInfoDto = await this.videoInfoService.createSeed(videoInfoDto);

        return new ResponseVideoCombineDto(videoRes, videoInfoRes);
    }

}
