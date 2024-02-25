import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Genre from "@models/genre/genre.entity";
import {In, Repository} from "typeorm";
import {CreateGenreDto} from "@models/genre/dto/create-genre.dto";

@Injectable()
export class GenreService {
    constructor(@InjectRepository(Genre)
                private genreRepository: Repository<Genre>) {
    }

    async create(dto: CreateGenreDto) {
        const exists: Genre = await this.genreRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        return await this.genreRepository.save(dto);
    }

    async getAll() {
        return await this.genreRepository.find();
    }

    async getOne(id: number) {
        const genre: Genre = await this.genreRepository.findOne({where: {id}})
        if (!genre)
            throw new NotFoundException(`Not found genre by id: ${id}`);
        return genre;
    }

    async existsArr(ids: number[]): Promise<boolean> {
        if (!Array.isArray(ids))
            return false;

        const genreArr: Genre[] = await this.genreRepository.find({
            where: {
                id: In(ids),
            },
            select: ['id'],
        });
        return genreArr.length === ids.length;
    }
}
