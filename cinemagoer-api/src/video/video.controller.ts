import {Body, Controller, Get, HttpStatus, Post, Query, Req, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {VideoService} from "@src/video/video.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {GetVideoSeriesDto} from "@src/video-series/dto/get-video-series.dto";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {ResponseVideoViewDto} from "@src/video/dto/response-video-view.dto";
import {CreateVideoCombineDto} from "@src/video/dto/create-video-combine.dto";

@ApiTags('Video')
@Controller('video')
export class VideoController {

    constructor(
        private videoService: VideoService
    ) {
    }

    @ApiOperation({summary: 'Create video'})
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseVideoViewDto})
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'icon', maxCount: 1},
        {name: 'trailers'},
        {name: 'pictures'}
    ]))
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

    @ApiOperation({summary: 'Get video',})
    @ApiResponse({status: HttpStatus.CREATED, type: [ResponseVideoSeriesDto]})
    @Get()
    getVideo(@Query() dto: GetVideoSeriesDto) {
        console.log(dto)

        //return this.videoSeriesService.getAll(dto);
    }
}
