import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import {CommentsService} from "@src/comments/comments.service";
import {CreateCommentRateDto} from "@src/comments-rate/dto/create-comment-rate.dto";
import {ResponseCommentRateDto} from "@src/comments-rate/dto/response-comment-rate.dto";
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

        const rate = await this.commentsRateRepository.create({...dto, userId: auth.id})
        return new ResponseCommentRateDto(rate);
    }

}
