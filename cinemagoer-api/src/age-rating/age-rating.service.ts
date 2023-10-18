import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import AgeRating from "@src/age-rating/age-rating.model";
import {CreateAgeRatingDto} from "@src/age-rating/dto/create-age-rating.dto";
import {ResponseAgeRatingDto} from "@src/age-rating/dto/response-age-rating.dto";

@Injectable()
export class AgeRatingService {
    constructor(@InjectModel(AgeRating) private ageRatingRepository: typeof AgeRating) {
    }

    async create(dto: CreateAgeRatingDto): Promise<CreateAgeRatingDto> {
        const exists: AgeRating = await this.ageRatingRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        const ageRating = await this.ageRatingRepository.create(dto);
        return new ResponseAgeRatingDto(ageRating);
    }

    async getAll(): Promise<ResponseAgeRatingDto[]> {
        const ageRatings = await this.ageRatingRepository.findAll();
        const responseAgeRatingDtos: ResponseAgeRatingDto[] = [];

        for (const status of ageRatings) {
            responseAgeRatingDtos.push(new ResponseAgeRatingDto(status));
        }

        return responseAgeRatingDtos;
    }

    async getOne(id: number) {
        const ageRating: AgeRating = await this.ageRatingRepository.findOne({where: {id}});
        return new ResponseAgeRatingDto(ageRating);
    }

    async exists(id: number): Promise<boolean> {
        const ageRating: AgeRating = await this.ageRatingRepository.findOne({where: {id}});
        return ageRating !== null;
    }
}
