import {Body, Controller, Get, HttpStatus, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CommentsService} from "@models/comments/comments.service";
import {CommentsRateService} from "@models/comments-rate/comments-rate.service";
import {ResponseCommentsDto} from "@models/comments/dto/response-comments.dto";
import {JwtAuthGuard} from "@src/guard/jwt-auth-guard";
import {CreateCommentsDto} from "@models/comments/dto/create-comments.dto";
import {CreateCommentRateDto} from "@models/comments-rate/dto/create-comment-rate.dto";
import {ResponseCountCommentsDto} from "@models/comments/dto/response-count-comments.dto";
import {PossiblyJwtAuthGuard} from "@src/guard/possibly-jwt-auth-guard";
import {GetCommentsDto} from "@models/comments/dto/get-comments.dto";

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
