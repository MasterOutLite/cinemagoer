import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleGuard} from "@src/guard/role-guard.service";
import {RoleUser} from "@src/const/role";
import {TypeService} from "@models/type/type.service";
import {CreateTypeDto} from "@models/type/dto/create-type.dto";
import {ResponseTypeDto} from "@models/type/dto/response-type.dto";

@ApiTags('Type')
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {
    }

    @ApiOperation({summary: 'Create type'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateTypeDto})
    @ApiBearerAuth('JWT')
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    createType(@Body() dto: CreateTypeDto) {
        return this.typeService.createType(dto);
    }

    @ApiOperation({summary: 'Get all type'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseTypeDto]})
    @Get()
    getTypeAll() {
        return this.typeService.getTypeAll();
    }
}
