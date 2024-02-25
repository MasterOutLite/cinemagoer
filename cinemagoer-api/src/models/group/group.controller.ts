import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GroupService} from "@models/group/group.service";
import {ResponseGroupDto} from "@models/group/dto/response-group.dto";
import {CreateGroupDto} from "@models/group/dto/create-group.dto";

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
    @ApiResponse({status: HttpStatus.OK, type: [ResponseGroupDto]})
    @Get()
    getAll() {
        return this.groupService.getAll();
    }
}
