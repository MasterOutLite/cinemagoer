import {Body, Controller, Get, HttpStatus, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateCommentsDto} from "@src/comments/dto/create-comments.dto";
import {CommentsService} from "@src/comments/comments.service";
import {ResponseCommentsDto} from "@src/comments/dto/response-comments.dto";
import {ResponseCountCommentsDto} from "@src/comments/dto/response-count-comments.dto";
import {GetCommentsDto} from "@src/comments/dto/get-comments.dto";
import {JwtAuthGuard} from "@src/auth/jwt-auth-guard";
import {PossiblyJwtAuthGuard} from "@src/auth/possibly-jwt-auth-guard";
import {CreateCommentRateDto} from "@src/comments-rate/dto/create-comment-rate.dto";
import {CommentsRateService} from "@src/comments-rate/comments-rate.service";

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {

    constructor(
        private commentsService: CommentsService,
        private commentsRateService: CommentsRateService
    ) {
    }

    @ApiOperation({summary: 'Create comment'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseCommentsDto})
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateCommentsDto, @Req() req) {
        return this.commentsService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Create comment'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseCommentsDto})
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Post('rate')
    createRate(@Body() dto: CreateCommentRateDto, @Req() req) {
        return this.commentsRateService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Get all comment'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseCountCommentsDto})
    @ApiBearerAuth('JWT')
    @UseGuards(PossiblyJwtAuthGuard)
    @Get()
    getAll(@Query() dto: GetCommentsDto, @Req() req) {
        //console.log(req.user)
        return this.commentsService.getAll(dto, req.user);
    }
}
