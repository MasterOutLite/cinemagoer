import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role";
import {AgeRatingService} from "@models/age-rating/age-rating.service";
import {CreateAgeRatingDto} from "@models/age-rating/dto/create-age-rating.dto";
import {ResponseAgeRatingDto} from "@models/age-rating/dto/response-age-rating.dto";


@ApiTags('AgeRating')
@Controller('age-rating')
export class AgeRatingController {
    constructor(private ageRatingService: AgeRatingService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: CreateAgeRatingDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
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
