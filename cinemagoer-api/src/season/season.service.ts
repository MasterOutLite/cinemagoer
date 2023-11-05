import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Season from "@src/season/season.model";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";
import {ExistsException} from "@src/exception/ExistsException";
import {SeasonQuery} from "@src/season/dto/season.query";
import {UpdateSeasonDto} from "@src/season/dto/update-season.dto";

@Injectable()
export class SeasonService {

    constructor(@InjectModel(Season) private seasonRepository: typeof Season) {
    }

    async create(dto: CreateSeasonDto) {
        const exists = await this.seasonRepository.findOne({where: {...dto}})
        if (exists)
            throw new ExistsException();
        const season: Season = await this.seasonRepository.create(dto);
        return new ResponseSeasonDto(season);
    }

    async update(dto: UpdateSeasonDto) {
        const season = await this.seasonRepository.findOne({where: {id: dto.id}});
        if (!season)
            throw new BadRequestException(`Not found season!`);

        await season.update(dto);
        return new ResponseSeasonDto(season);
    }

    async getAll(dto: SeasonQuery): Promise<ResponseSeasonDto[]> {
        const seasons: Season[] = await this.seasonRepository.findAll({where: {videoId: dto.videoId}});
        const seasonsRes: ResponseSeasonDto[] = [];
        for (const season of seasons) {
            const seasonRes: ResponseSeasonDto = new ResponseSeasonDto(season);
            seasonsRes.push(seasonRes);
        }
        return seasonsRes;
    }

    async exists(id: number): Promise<boolean> {
        const season: Season = await this.seasonRepository.findOne({where: {id}})
        return season !== null;
    }

    async getOne(id: number): Promise<Season> {
        return await this.seasonRepository.findOne({where: {id}});
    }
}
