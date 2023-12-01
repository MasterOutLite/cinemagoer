import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import {CommentsService} from "@src/comments/comments.service";
import {CreateCommentRateDto} from "@src/comments-rate/dto/create-comment-rate.dto";
import {ResponseCommentRateDto, StateRate} from "@src/comments-rate/dto/response-comment-rate.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";

@Injectable()
export class CommentsRateService {
    constructor(
        @InjectModel(CommentsRate)
        private commentsRateRepository: typeof CommentsRate,
        private commentsService: CommentsService
    ) {
    }

    async create(dto: CreateCommentRateDto, auth: TokenFormat): Promise<ResponseCommentRateDto> {
        const exists = await this.commentsService.exists(dto.commentId);
        if (!exists)
            throw new BadRequestException('Comment not found.')

        let rate = await this.commentsRateRepository.findOne({
            where: {
                commentId: dto.commentId,
                userId: auth.id
            }
        })

        let state: StateRate;
        if (rate) {
            if (rate.rate === dto.rate) {
                await rate.destroy();
                state = StateRate.remove;
            } else {
                rate.rate = dto.rate;
                await rate.save();
                state = StateRate.update;
            }
        } else {
            rate = await this.commentsRateRepository.create({...dto, userId: auth.id});
            state = StateRate.create;
        }
        return new ResponseCommentRateDto(rate, state);
    }

}
