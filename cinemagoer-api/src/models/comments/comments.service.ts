import {BadRequestException, Injectable} from '@nestjs/common';
import Comments from "@models/comments/comments.entity";
import {Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {CreateCommentsDto} from "@models/comments/dto/create-comments.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import Video from "@models/video/video.entity";
import Users from "@models/users/users.entity";
import {GetCommentsDto} from "@models/comments/dto/get-comments.dto";
import CommentsRate from "@models/comments-rate/comments-rate.entity";
import {ResponseCountCommentsDto} from "@models/comments/dto/response-count-comments.dto";

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(CommentsRate)
        private commentsRateRepository: Repository<CommentsRate>,
    ) {
    }

    async create(dto: CreateCommentsDto, auth: TokenFormat) {
        const existsAtr: { tag: string, exists: boolean }[] = [];
        existsAtr.push({tag: 'videoId', exists: await this.videoRepository.exists({where: {id: dto.videoId}})});

        if (dto.commentId)
            existsAtr.push({
                tag: 'commentId',
                exists: await this.commentsRepository.exists({where: {id: dto.commentId}})
            });
        if (dto.userAnswerId)
            existsAtr.push({
                tag: 'userAnswerId',
                exists: await this.userRepository.exists({where: {id: dto.userAnswerId}})
            });

        const wrongAtr = existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }

        return await this.commentsRepository.save({...dto, userId: auth.id});
    }

    async getAll(dto: GetCommentsDto, auth: TokenFormat) {
        console.log('Comments Service: dto ', dto)
        const search: { videoId: number, commentsId?: number } = {videoId: dto.videoId};
        if (dto.commentId)
            search.commentsId = dto.commentId;
        console.log('Comments Service: search ', search)
        const take = dto.count || 20;
        const skip = dto.count * dto.page;

        console.log('Comments Service:', `take: ${take}. skip: ${skip}`);

        const exists = await this.videoRepository.exists({where: {id: dto.videoId}});
        if (!exists) {
            throw new BadRequestException(`Request param videoId is null or bad value!`);
        }

        const commentsCount = await this.commentsRepository.findAndCount({
            where: {...search},
            relations: {
                user: true,
                comments: true,
            },
            select: {
                user: {id: true, nickname: true, avatar: true}
            }
        })

        const comments = commentsCount[0];
        const newComments = [];
        for (const comment of comments) {
            const likeCount = await this.commentsRateRepository.count({
                where: {
                    commentsId: comment.id,
                    rate: true
                }
            });
            const dislikeCount = await this.commentsRateRepository.count({
                where: {
                    commentsId: comment.id,
                    rate: false
                }
            });

            const userLike = await this.commentsRateRepository.count({
                where: {
                    commentsId: comment.id,
                    userId: auth ? auth.id : 0
                }
            });

            newComments.push({...comment, likeCount, dislikeCount, userLike})
        }

        //console.log('Comments Service:', 'comments date', commentsCount);
        console.log('Comments Service:', 'newComments date', newComments);
        return new ResponseCountCommentsDto(commentsCount[1], newComments);
    }
}
