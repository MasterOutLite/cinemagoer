import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PublisherService} from "@src/publisher/publisher.service";
import {CreatePublisherDto} from "@src/publisher/dto/create-publisher.dto";
import {ResponsePublisherDto} from "@src/publisher/dto/response-publisher.dto";

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreatePublisherDto})
    @Post()
    createType(@Body() dto: CreatePublisherDto){
        return this.publisherService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponsePublisherDto]})
    @Get()
    getTypeAll(){
        return this.publisherService.getAll();
    }
}
