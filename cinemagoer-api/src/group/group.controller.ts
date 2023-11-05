import {Body, Controller, Get, HttpStatus, Post, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ResponseGroupDto} from "@src/group/dto/response-group.dto";
import {CreateGroupDto} from "@src/group/dto/create-group.dto";
import {GroupService} from "@src/group/group.service";

@ApiTags('Group')
@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService) {
    }

    @ApiOperation({summary: 'Create group'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseGroupDto})
    @Post()
    create(@Body() dto: CreateGroupDto) {
        return this.groupService.create(dto);
    }

    @ApiOperation({summary: 'Get group'})
    @ApiResponse({status: HttpStatus.CREATED, type: [ResponseGroupDto]})
    @Get()
    getAll() {
        return this.groupService.getAll();
    }
}
