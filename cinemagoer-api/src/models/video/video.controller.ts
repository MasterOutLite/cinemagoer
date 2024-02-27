import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleUser} from "@src/const/role";
import {RoleGuard} from "@src/guard/role-guard.service";
import {JwtAuthGuard} from "@src/guard/jwt-auth-guard";
import {PossiblyJwtAuthGuard} from "@src/guard/possibly-jwt-auth-guard";
import {VideoInfoService} from "@models/video-info/video-info.service";
import {VideoService} from "@models/video/video.service";
import {CreateVideoRateDto} from "@models/video-rate/dto/create-video-rate.dto";
import {VideoRateService} from "@models/video-rate/video-rate.service";
import {ResponseVideoCombineDto} from "@models/video/dto/response-video-combine.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateVideoCombineDto} from "@models/video/dto/create-video-combine.dto";
import {UpdateVideoDto} from "@models/video/dto/update-video.dto";
import {ResponseVideoInfoDto} from "@models/video-info/dto/response-video-info.dto";
import {UpdateVideoInfoDto} from "@models/video-info/dto/update-video-info.dto";
import {ResponseVideoDto} from "@models/video/dto/response-video.dto";
import {GetVideoQuery} from "@models/video/query/get-video.query";
import {ResponseCountVideoDto} from "@models/video/dto/response-count-video.dto";
import {FilterVideoQuery} from "@models/video/query/filter-video.query";
import {SearchVideoQuery} from "@models/video/query/search-video.query";

@ApiTags('Video')
@Controller('video')
export class VideoController {

    constructor(
        private videoService: VideoService,
        private videoInfoService: VideoInfoService,
        private videoRateService: VideoRateService
    ) {
    }

    @ApiOperation({summary: 'Create video rate'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED,})
    @UseGuards(JwtAuthGuard)
    @Post('rate')
    createRate(@Body() dto: CreateVideoRateDto, @Req() req) {
        return this.videoRateService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Create video'})
    @ApiBearerAuth('JWT')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseVideoCombineDto})
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'icon', maxCount: 1},
        {name: 'trailers'},
        {name: 'pictures'}
    ]))
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    createVideo(@Body() dto: CreateVideoCombineDto,
                @UploadedFiles() files: {
                    icon: Express.Multer.File[],
                    trailers: Express.Multer.File[],
                    pictures: Express.Multer.File[]
                }
    ) {
        return this.videoService.create(dto, files);
    }

    @ApiOperation({summary: 'Update video'})
    @ApiBearerAuth('JWT')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseVideoCombineDto})
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'icon', maxCount: 1},
    ]))
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Put()
    update(@Body() dto: UpdateVideoDto,
           @UploadedFiles() files: {
               icon: Express.Multer.File[],
           }) {
        return this.videoService.update(dto, files);
    }

    @ApiOperation({summary: 'Update video'})
    @ApiBearerAuth('JWT')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseVideoInfoDto})
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'trailers'},
        {name: 'pictures'}
    ]))
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Put('info')
    updateVideoInfo(@Body() dto: UpdateVideoInfoDto,
                    @UploadedFiles() files: {
                        trailers: Express.Multer.File[],
                        pictures: Express.Multer.File[]
                    }) {
        return this.videoInfoService.update(dto, files.trailers, files.pictures);
    }

    @ApiOperation({summary: 'Get video',})
    @ApiResponse({status: HttpStatus.OK, type: ResponseVideoDto})
    @ApiBearerAuth('JWT')
    @UseGuards(PossiblyJwtAuthGuard)
    @Get()
    getVideo(@Query() dto: GetVideoQuery, @Req() req) {
        return this.videoService.get(dto, req.user);
    }

    @ApiOperation({summary: 'Get video',})
    @ApiResponse({status: HttpStatus.OK, type: ResponseCountVideoDto})
    @ApiBearerAuth('JWT')
    @UseGuards(PossiblyJwtAuthGuard)
    @Get('filter')
    getVideoByFilter(@Query() dto: FilterVideoQuery, @Req() req) {
        return this.videoService.getVideoByFilter(dto, req.user);
    }

    @ApiOperation({summary: 'Get video',})
    @ApiResponse({status: HttpStatus.OK, type: ResponseCountVideoDto})
    @ApiBearerAuth('JWT')
    @UseGuards(PossiblyJwtAuthGuard)
    @Get('searchByName')
    getVideoByName(@Query() query: SearchVideoQuery, @Req() req) {
        return this.videoService.getVideoByName(query, req.user);
    }
}
