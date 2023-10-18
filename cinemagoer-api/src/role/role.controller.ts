import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RoleService} from "@role/role.service";
import {ResponseRoleDto} from "@role/dto/response-role.dto";
import {CreateRoleDto} from "@role/dto/create-role.dto";
import {ResponseUserDto} from "@users/dto/response-user.dto";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @ApiOperation({summary: 'Create role'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseRoleDto})
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Get all role'})
    @ApiResponse({status: HttpStatus.OK, type: ResponseUserDto})
    @Get()
    getRoleAll() {
        return this.roleService.getRoleAll();
    }
}
