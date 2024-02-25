import {Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role";
import {VideoSeriesService} from "@models/video-series/video-series.service";
import {ResponseVideoSeriesDto} from "@models/video-series/dto/response-video-series.dto";
import {CreateListSeriesDto} from "@models/video-series/dto/create-list-series.dto";
import {UpdateListSeriesDto} from "@models/video-series/dto/update-list-series.dto";
import {VideoSeriesQuery} from "@models/video-series/query/video-series.query";
import ResponseSeriesDayOfWeekDto from "@models/video-series/dto/response-series-day-of-week.dto";

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
    update(@Body() dto: UpdateListSeriesDto) {
        return this.videoSeriesService.update(dto);
    }

    @ApiOperation({summary: 'Get series'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseVideoSeriesDto]})
    @Get()
    get(@Query() dto: VideoSeriesQuery) {
        return this.videoSeriesService.getAll(dto);
    }

    @ApiOperation({summary: 'Get series day of week'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseSeriesDayOfWeekDto]})
    @Get('seriesOfDay')
    getSeriesDayOfWeek() {
        return this.videoSeriesService.getAllByDayOfWeek();
    }
}
