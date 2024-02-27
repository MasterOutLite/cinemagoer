import {Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleUser} from "@src/const/role";
import {RoleGuard} from "@src/guard/role-guard.service";
import {SeasonService} from "@models/season/season.service";
import {ResponseSeasonDto} from "@models/season/dto/response-season.dto";
import {CreateSeasonDto} from "@models/season/dto/create-season.dto";
import {UpdateSeasonDto} from "@models/season/dto/update-season.dto";
import {SeasonQuery} from "@models/season/dto/season.query";

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
    @UseGuards(RoleGuard)
    @Post()
    create(@Body() dto: CreateSeasonDto) {
        return this.seasonService.create(dto);
    }

    @ApiOperation({summary: 'Update season'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.OK, type: [ResponseSeasonDto]})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
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
