import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TypeService} from "@src/type/type.service";
import {CreateTypeDto} from "@src/type/dto/create-type.dto";
import {ResponseTypeDto} from "@src/type/dto/response-type.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role-const";

@ApiTags('Type')
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {
    }

    @ApiOperation({summary: 'Create type'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateTypeDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    createType(@Body() dto: CreateTypeDto){
        return this.typeService.createType(dto);
    }

    @ApiOperation({summary: 'Get all type'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseTypeDto]})
    @Get()
    getTypeAll(){
        return this.typeService.getTypeAll();
    }
}
