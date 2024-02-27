import {BadRequestException, Injectable} from '@nestjs/common';
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import CommentsRate from "@models/comments-rate/comments-rate.entity";
import Comments from "@models/comments/comments.entity";
import {CreateCommentRateDto} from "@models/comments-rate/dto/create-comment-rate.dto";
import {ResponseCommentRateDto, StateRate} from "@models/comments-rate/dto/response-comment-rate.dto";

@Injectable()
export class CommentsRateService {
    constructor(
        @InjectRepository(CommentsRate)
        private commentsRateRepository: Repository<CommentsRate>,
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>
    ) {
    }

    async create(dto: CreateCommentRateDto, auth: TokenFormat) {
        const exists = await this.commentsRepository.exists({where: {id: dto.commentId}});
        if (!exists)
            throw new BadRequestException('Comment not found.')

        let rate = await this.commentsRateRepository.findOne({
            where: {
                commentsId: dto.commentId,
                userId: auth.id
            }
        })

        let state: StateRate;
        if (rate) {
            if (rate.rate === dto.rate) {
                await this.commentsRateRepository.delete(rate);
                state = StateRate.remove;
            } else {
                rate.rate = dto.rate;
                await this.commentsRateRepository.update(rate.id, rate);
                state = StateRate.update;
            }
        } else {
            rate = await this.commentsRateRepository.save({...dto, userId: auth.id, commentsId: dto.commentId});
            state = StateRate.create;
        }
        return new ResponseCommentRateDto(rate, state);
    }

}
