import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role";
import {GenreService} from "@models/genre/genre.service";
import {ResponseGenreDto} from "@models/genre/dto/response-genre.dto";
import {CreateGenreDto} from "@models/genre/dto/create-genre.dto";
@ApiTags('Genre')
@Controller('genre')
export class GenreController {
    constructor(private genreService: GenreService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseGenreDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    createGenre(@Body() dto: CreateGenreDto){
        return this.genreService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseGenreDto]})
    @Get()
    getAll(){
        return this.genreService.getAll();
    }
}
