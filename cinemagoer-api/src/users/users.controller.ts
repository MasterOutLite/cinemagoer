import {Body, Controller, Get, HttpStatus, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from "@users/dto/create-user.dto";
import {UsersService} from "@users/users.service";
import {ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseUserDto} from "@users/dto/response-user.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@ApiTags('User')
@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseUserDto})
    @UseInterceptors(FileFieldsInterceptor([{name: 'avatar', maxCount: 1}]))
    @Post()
    createUser(@UploadedFiles() files, @Body() dto: CreateUserDto,) {
        return this.userService.createUser(dto, files.avatar);
    }

    @ApiOperation({summary: 'Get all user'})
    @ApiResponse({status: HttpStatus.OK, type: ResponseUserDto})
    @Get()
    getUserAll() {

        return this.userService.getUserAll();
    }

}
