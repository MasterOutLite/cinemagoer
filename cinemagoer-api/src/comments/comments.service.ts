import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateCommentsDto} from "@src/comments/dto/create-comments.dto";
import Comments from "@src/comments/comments.model";
import {InjectModel} from "@nestjs/sequelize";
import {ResponseCommentsDto} from "@src/comments/dto/response-comments.dto";
import {VideoService} from "@src/video/video.service";
import {UsersService} from "@users/users.service";
import {GetCommentsDto} from "@src/comments/dto/get-comments.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {literal} from "sequelize";
import {ResponseCountCommentsDto} from "@src/comments/dto/response-count-comments.dto";

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comments)
        private commentsRepository: typeof Comments,
        private videoService: VideoService,
        private usersService: UsersService,
    ) {
    }

    async create(dto: CreateCommentsDto, auth: TokenFormat): Promise<ResponseCommentsDto> {
        const existsAtr: { tag: string, exists: boolean }[] = [];
        existsAtr.push({tag: 'videoId', exists: await this.videoService.exists(dto.videoId)});

        if (dto.commentId)
            existsAtr.push({tag: 'commentId', exists: await this.usersService.exists(dto.commentId)});
        if (dto.userAnswerId)
            existsAtr.push({tag: 'userAnswerId', exists: await this.usersService.exists(dto.userAnswerId)});

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        const comment: Comments = await this.commentsRepository.create({...dto, userId: auth.id});
        return new ResponseCommentsDto(comment);
    }

    async getAll(dto: GetCommentsDto, auth: TokenFormat) {
        const search: { videoId: number, commentId: number } = {videoId: dto.videoId, commentId: dto.commentId || null};
        const count = dto.count || 20;

        const exists = await this.videoService.exists(dto.videoId)
        if (!exists) {
            throw new BadRequestException(`Request param videoId is null or bad value!`);
        }

        const comments = await this.commentsRepository.findAndCountAll(
            {
                attributes: {
                    include: [
                        [literal('(SELECT count("rate") FROM "comments-rate" as "CommentsRate" WHERE "CommentsRate"."commentId" = "Comments"."id" and "CommentsRate"."rate" = true)'), 'like'],
                        [literal('(SELECT count("rate") FROM "comments-rate" as "CommentsRate" WHERE "CommentsRate"."commentId" = "Comments"."id" and "CommentsRate"."rate" = false)'), 'dislike'],
                        [literal(`(SELECT "rate" FROM "comments-rate" as "CommentsRate" WHERE "CommentsRate"."commentId" = "Comments"."id" and "CommentsRate"."userId" = ${auth ? auth.id : 0})`), 'userLike']
                    ]
                },
                where: {
                    ...search
                },
                limit: count,
                offset: dto.page * count,
                distinct: true,
            })

        return new ResponseCountCommentsDto(comments.count, comments.rows);
    }

    async exists(id: number): Promise<boolean> {
        const comments: Comments = await this.commentsRepository.findOne({where: {id}})
        return comments !== null;
    }
}
