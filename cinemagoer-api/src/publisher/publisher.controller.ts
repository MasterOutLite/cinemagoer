import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PublisherService} from "@src/publisher/publisher.service";
import {CreatePublisherDto} from "@src/publisher/dto/create-publisher.dto";
import {ResponsePublisherDto} from "@src/publisher/dto/response-publisher.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role";

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
    constructor(private publisherService: PublisherService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: CreatePublisherDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
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
