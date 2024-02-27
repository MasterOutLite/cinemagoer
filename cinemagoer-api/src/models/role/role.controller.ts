import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleGuard} from "@src/guard/role-guard.service";
import {RoleUser} from "@src/const/role";
import {RoleService} from "@models/role/role.service";
import {ResponseRoleDto} from "@models/role/dto/response-role.dto";
import {CreateRoleDto} from "@models/role/dto/create-role.dto";
import {ResponseUserDto} from "@models/users/dto/response-user.dto";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @ApiOperation({summary: 'Create role'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseRoleDto})
    @Roles( RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    @ApiBearerAuth('JWT')
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Get all role'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseUserDto]})
    @Get()
    getRoleAll() {
        return this.roleService.getRoleAll();
    }
}
