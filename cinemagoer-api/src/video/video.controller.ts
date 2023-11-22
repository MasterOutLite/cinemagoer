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
import {VideoService} from "@src/video/video.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ResponseVideoCombineDto} from "@src/video/dto/response-video-combine.dto";
import {CreateVideoCombineDto} from "@src/video/dto/create-video-combine.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RoleUser} from "@src/const/role";
import {RolesGuard} from "@src/auth/roles-guard";
import {FilterVideoQuery} from "@src/video/query/filter-video.query";
import {ResponseVideoDto} from "@src/video/dto/response-video.dto";
import {SearchVideoQuery} from "@src/video/query/search-video.query";
import {ResponseCountVideoDto} from "@src/video/dto/response-count-video.dto";
import {UpdateVideoDto} from "@src/video/dto/update-video.dto";
import {GetVideoQuery} from "@src/video/query/get-video.query";
import {UpdateVideoInfoDto} from "@src/video-info/dto/update-video-info.dto";
import {ResponseVideoInfoDto} from "@src/video-info/dto/response-video-info.dto";
import {VideoInfoService} from "@src/video-info/video-info.service";
import {JwtAuthGuard} from "@src/auth/jwt-auth-guard";
import {CreateVideoRateDto} from "@src/video-rate/dto/create-video-rate.dto";
import {PossiblyJwtAuthGuard} from "@src/auth/possibly-jwt-auth-guard";

@ApiTags('Video')
@Controller('video')
export class VideoController {

    constructor(
        private videoService: VideoService,
        private videoInfoService: VideoInfoService
    ) {
    }

    @ApiOperation({summary: 'Create video rate'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED,})
    @UseGuards(JwtAuthGuard)
    @Post('rate')
    createRate(@Body() dto: CreateVideoRateDto, @Req() req) {
        return this.videoService.createRate(dto, req.user);
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
    @UseGuards(RolesGuard)
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
    @UseGuards(RolesGuard)
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
    @UseGuards(RolesGuard)
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
