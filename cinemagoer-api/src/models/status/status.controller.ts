import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleUser} from "@src/const/role";
import {RoleGuard} from "@src/guard/role-guard.service";
import {StatusService} from "@models/status/status.service";
import {CreateStatusDto} from "@models/status/dto/create-status.dto";
import {ResponseStatusDto} from "@models/status/dto/response-status.dto";

@ApiTags('Status')
@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateStatusDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    createType(@Body() dto: CreateStatusDto) {
        return this.statusService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseStatusDto]})
    @Get()
    getTypeAll() {
        return this.statusService.getAll();
    }

}
