import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StatusService} from "@src/status/status.service";
import {CreateStatusDto} from "@src/status/dto/create-status.dto";
import {ResponseStatusDto} from "@src/status/dto/response-status.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RoleUser} from "@src/const/role-const";
import {RolesGuard} from "@src/auth/roles-guard";

@ApiTags('Status')
@Controller('status')
export class StatusController {
    constructor(private statusService: StatusService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateStatusDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    createType(@Body() dto: CreateStatusDto){
        return this.statusService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseStatusDto]})
    @Get()
    getTypeAll(){
        return this.statusService.getAll();
    }

}
