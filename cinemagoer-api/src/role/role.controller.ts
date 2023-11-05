import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RoleService} from "@role/role.service";
import {ResponseRoleDto} from "@role/dto/response-role.dto";
import {CreateRoleDto} from "@role/dto/create-role.dto";
import {ResponseUserDto} from "@users/dto/response-user.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role-const";

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @ApiOperation({summary: 'Create role'})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseRoleDto})
    @Roles( RoleUser.ADMIN)
    @UseGuards(RolesGuard)
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
