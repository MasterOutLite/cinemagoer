import {Body, Controller, Get, HttpStatus, Put, Req, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "@src/guard/jwt-auth-guard";
import {Roles} from "@src/guard/roles.decorator";
import {RoleGuard} from "@src/guard/role-guard.service";
import {RoleUser} from "@src/const/role";
import {UsersService} from "@models/users/users.service";
import {UserDto} from "@models/users/dto/user.dto";
import {UpdateUserRoleDto} from "@models/users/dto/update-user-role.dto";
import {UpdateUserDto} from "@models/users/dto/update-user.dto";
import {ResponseUserDto} from "@models/users/dto/response-user.dto";

@ApiTags('User')
@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Update user role'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: UserDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Put('role')
    updateUserRole(@Body() dto: UpdateUserRoleDto) {
        return this.userService.updateRole(dto);
    }

    @ApiOperation({summary: 'Update date user'})
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: UpdateUserDto})
    @UseInterceptors(FileFieldsInterceptor([{name: 'avatar', maxCount: 1}]))
    @UseGuards(JwtAuthGuard)
    @Put()
    updateUser(@Body() dto: UpdateUserDto, @Req() req, @UploadedFiles() files) {
        return this.userService.updateUser(dto, files.avatar, req.user);
    }

    @ApiOperation({summary: 'Get all user'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseUserDto]})
    @ApiBearerAuth('JWT')
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Get()
    getUserAll() {
        return this.userService.getUserAll();
    }
}
