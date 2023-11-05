import {Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RoleUser} from "@src/const/role-const";
import {RolesGuard} from "@src/auth/roles-guard";
import {SeasonService} from "@src/season/season.service";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";
import {ResponseVideoSeriesDto} from "@src/video-series/dto/response-video-series.dto";
import {SeasonQuery} from "@src/season/dto/season.query";
import {UpdateListSeriesDto} from "@src/video-series/dto/update-list-series.dto";
import {UpdateSeasonDto} from "@src/season/dto/update-season.dto";

@ApiTags('Season')
@Controller('season')
export class SeasonController {

    constructor(
        private seasonService: SeasonService,
    ) {
    }

    @ApiOperation({summary: 'Create season'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseSeasonDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateSeasonDto) {
        return this.seasonService.create(dto);
    }

    @ApiOperation({summary: 'Update season'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.OK, type: [ResponseSeasonDto]})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Put()
    update(@Body() dto: UpdateSeasonDto) {
        return this.seasonService.update(dto);
    }

    @ApiOperation({summary: 'Get season'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseSeasonDto]})
    @Get()
    getAll(@Query() dto: SeasonQuery) {
        return this.seasonService.getAll(dto);
    }
}
