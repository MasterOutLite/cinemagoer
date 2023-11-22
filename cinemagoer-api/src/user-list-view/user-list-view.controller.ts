import {Body, Controller, Get, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {UserListViewService} from "@src/user-list-view/user-list-view.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseUserListViewDto} from "@src/user-list-view/dto/response-user-list-view.dto";
import {JwtAuthGuard} from "@src/auth/jwt-auth-guard";
import {ResponseListViewArrDto} from "@src/user-list-view/dto/response-list-view-arr.dto";
import {CreateListViewDto} from "@src/user-list-view/dto/create-list-view.dto";

@ApiTags('UserListView')
@Controller('user-list-view')
export class UserListViewController {

    constructor(private userListViewService: UserListViewService) {
    }

    @ApiOperation({summary: 'Get video',})
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseListViewArrDto})
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() dto: CreateListViewDto, @Req() req) {
        return this.userListViewService.add(dto, req.user);
    }

    @ApiOperation({summary: 'Get list view user',})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseUserListViewDto]})
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() req) {
        return this.userListViewService.getAll({userId: req.user.id});
    }

    @ApiOperation({summary: 'Get list view user with video',})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseUserListViewDto]})
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get('video')
    getAllWithVideo(@Req() req) {
        return this.userListViewService.getAllWithVideo({userId: req.user.id});
    }
}
