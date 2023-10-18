import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AgeRatingService} from "@src/age-rating/age-rating.service";
import {CreateAgeRatingDto} from "@src/age-rating/dto/create-age-rating.dto";
import {ResponseAgeRatingDto} from "@src/age-rating/dto/response-age-rating.dto";

@ApiTags('AgeRating')
@Controller('age-rating')
export class AgeRatingController {
    constructor(private ageRatingService: AgeRatingService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateAgeRatingDto})
    @Post()
    createType(@Body() dto: CreateAgeRatingDto){
        return this.ageRatingService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseAgeRatingDto]})
    @Get()
    getAll(){
        return this.ageRatingService.getAll();
    }
}
