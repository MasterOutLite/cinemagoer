import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TypeService} from "@src/type/type.service";
import {ResponseVideoDto} from "@src/video/dto/response-video.dto";
import {CreateTypeDto} from "@src/type/dto/create-type.dto";
import {ResponseTypeDto} from "@src/type/dto/response-type.dto";

@ApiTags('Type')
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {
    }

    @ApiOperation({summary: 'Create type'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateTypeDto})
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
