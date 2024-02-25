import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import AgeRating from "@models/age-rating/age-rating.entity";
import {CreateAgeRatingDto} from "@models/age-rating/dto/create-age-rating.dto";


@Injectable()
export class AgeRatingService {
    constructor(@InjectRepository(AgeRating)
                private ageRatingRepository: Repository<AgeRating>) {
    }

    async create(dto: CreateAgeRatingDto) {
        const exists: AgeRating = await this.ageRatingRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        return await this.ageRatingRepository.create(dto);
    }

    async getAll() {
        return await this.ageRatingRepository.find();
    }

    async getOne(id: number) {
        const ageRating: AgeRating = await this.ageRatingRepository.findOne({where: {id}});
        if (!ageRating)
            throw new NotFoundException(`Not found age rating by id: ${id}`)
        return ageRating;
    }

}
