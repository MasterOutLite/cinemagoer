import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GenreService} from "@src/genre/genre.service";
import {CreateGenreDto} from "@src/genre/dto/create-genre.dto";
import {ResponseGenreDto} from "@src/genre/dto/response-genre.dto";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RolesGuard} from "@src/auth/roles-guard";
import {RoleUser} from "@src/const/role-const";
@ApiTags('Genre')
@Controller('genre')
export class GenreController {
    constructor(private genreService: GenreService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: CreateGenreDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
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
