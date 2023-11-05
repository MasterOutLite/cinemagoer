import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Genre from "@src/genre/genre.model";
import {CreateGenreDto} from "@src/genre/dto/create-genre.dto";
import {ResponseGenreDto} from "@src/genre/dto/response-genre.dto";
import {Op} from "sequelize";

@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre) private genreRepository: typeof Genre) {
    }

    async create(dto: CreateGenreDto): Promise<ResponseGenreDto> {
        const exists: Genre = await this.genreRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        const genre = await this.genreRepository.create(dto);
        return new ResponseGenreDto(genre);
    }

    async getAll(): Promise<ResponseGenreDto[]> {
        const genres = await this.genreRepository.findAll();
        const responseGenreDtos: ResponseGenreDto[] = [];

        for (const status of genres) {
            responseGenreDtos.push(new ResponseGenreDto(status));
        }

        return responseGenreDtos;
    }

    async getOne(id: number) {
        const genre: Genre = await this.genreRepository.findOne({where: {id}})
        return new ResponseGenreDto(genre);
    }

    async existsArr(ids: number[]): Promise<boolean> {
        if (!Array.isArray(ids))
            return false;

        const genreArr: Genre[] = await this.genreRepository.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            attributes: ['id'],
        });
        return genreArr.length === ids.length;
    }
}
