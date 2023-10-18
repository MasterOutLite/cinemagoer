import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {VideoCategoryService} from "@src/video-category/video-category.service";
import {CreateVideoCategoryDto} from "@src/video-category/dto/create-video-category.dto";
import {ResponseVideoCategoryDto} from "@src/video-category/dto/response-video-category.dto";

@ApiTags('VideoCategory')
@Controller('video-category')
export class VideoCategoryController {
    constructor(private videoCategoryService: VideoCategoryService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateVideoCategoryDto})
    @Post()
    create(@Body() dto: CreateVideoCategoryDto){
        return this.videoCategoryService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseVideoCategoryDto]})
    @Get()
    getType(){
        return this.videoCategoryService.getAll();
    }
}
