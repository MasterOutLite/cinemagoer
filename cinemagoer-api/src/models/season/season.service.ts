import {BadRequestException, Injectable} from '@nestjs/common';
import Season from "@models/season/season.entity";
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {CreateSeasonDto} from "@models/season/dto/create-season.dto";
import {ExistsException} from "@src/exception/ExistsException";
import {UpdateSeasonDto} from "@models/season/dto/update-season.dto";
import {SeasonQuery} from "@models/season/dto/season.query";

@Injectable()
export class SeasonService {

    constructor(@InjectRepository(Season)
                private seasonRepository: Repository<Season>) {
    }

    async create(dto: CreateSeasonDto) {
        const exists = await this.seasonRepository.findOne({where: {...dto}})
        if (exists)
            throw new ExistsException();

        return await this.seasonRepository.save(dto);
    }

    async update(dto: UpdateSeasonDto) {
        const season = await this.seasonRepository.findOne({where: {id: dto.id}});
        if (!season)
            throw new BadRequestException(`Not found season!`);

        return await this.seasonRepository.update(dto.id, dto);
    }

    async getAll(dto: SeasonQuery) {
        return await this.seasonRepository.find({where: {videoId: dto.videoId}});
    }

}
