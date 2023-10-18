import {Body, Controller, Get, HttpStatus, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GenreService} from "@src/genre/genre.service";
import {CreateGenreDto} from "@src/genre/dto/create-genre.dto";
import {ResponseGenreDto} from "@src/genre/dto/response-genre.dto";
@ApiTags('Genre')
@Controller('genre')
export class GenreController {
    constructor(private genreService: GenreService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiResponse({status: HttpStatus.CREATED, type: CreateGenreDto})
    @Post()
    createType(@Body() dto: CreateGenreDto){
        return this.genreService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseGenreDto]})
    @Get()
    getAll(){
        return this.genreService.getAll();
    }
}
