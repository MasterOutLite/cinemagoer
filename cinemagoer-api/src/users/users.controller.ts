import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Put,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "@users/dto/create-user.dto";
import {UsersService} from "@users/users.service";
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseUserDto} from "@users/dto/response-user.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "@src/auth/jwt-auth-guard";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role";
import {AuthModule} from "@src/auth/auth.module";
import {UpdateUserDto} from "@users/dto/update-user.dto";
import {UserDto} from "@users/dto/user.dto";
import {UpdateUserRoleDto} from "@users/dto/update-user-role.dto";

@ApiTags('User')
@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Update user role'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: UserDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
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
    @UseGuards(RolesGuard)
    @Get()
    getUserAll() {
        return this.userService.getUserAll();
    }
}
