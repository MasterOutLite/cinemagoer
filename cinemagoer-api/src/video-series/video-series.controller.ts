import {Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {CreateListSeriesDto} from "@src/video-series/dto/create-list-series.dto";
import {VideoSeriesService} from "@src/video-series/video-series.service";
import {VideoSeriesQuery} from "@src/video-series/dto/video-series.query";
import {UpdateListSeriesDto} from "@src/video-series/dto/update-list-series.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role-const";

@ApiTags('VideoSeries')
@Controller('video-series')
export class VideoSeriesController {
    constructor(
        private videoSeriesService: VideoSeriesService
    ) {
    }

    @ApiOperation({summary: 'Create series'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: [ResponseVideoSeriesDto]})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateListSeriesDto) {
        return this.videoSeriesService.create(dto);
    }

    @ApiOperation({summary: 'Update series'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.OK, type: [ResponseVideoSeriesDto]})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Put()
    update(@Body() dto: UpdateListSeriesDto){
        return this.videoSeriesService.update(dto);
    }

    @ApiOperation({summary: 'Get series'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseVideoSeriesDto]})
    @Get()
    get(@Query() dto: VideoSeriesQuery) {
        return this.videoSeriesService.getAll(dto);
    }
}
