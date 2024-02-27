import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleGuard} from "@src/guard/role-guard.service";
import {RoleUser} from "@src/const/role";
import {PublisherService} from "@models/publisher/publisher.service";
import {CreatePublisherDto} from "@models/publisher/dto/create-publisher.dto";
import {ResponsePublisherDto} from "@models/publisher/dto/response-publisher.dto";

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: CreatePublisherDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    createType(@Body() dto: CreatePublisherDto) {
        return this.publisherService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponsePublisherDto]})
    @Get()
    getTypeAll() {
        return this.publisherService.getAll();
    }
}
