import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Season from "@src/season/season.model";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {ResponseSeasonDto} from "@src/season/dto/response-season.dto";

@Injectable()
export class SeasonService {

    constructor(@InjectModel(Season) private seasonRepository: typeof Season) {
    }

    async create(dto: CreateSeasonDto) {
        const season: Season = await this.seasonRepository.create(dto);
        return new ResponseSeasonDto(season);
    }

    async get(id: number): Promise<ResponseSeasonDto> {
        if (!id)
            throw new BadRequestException('Id null or zero.')

        const season: Season = await this.seasonRepository.findOne({where: {id}});
        return new ResponseSeasonDto(season);
    }

    async getByVideoId(videoId: number): Promise<ResponseSeasonDto[]> {
        if (!videoId)
            throw new BadRequestException('VideoId null or zero.')

        const seasons: Season[] = await this.seasonRepository.findAll({where: {videoId}});
        const seasonsRes: ResponseSeasonDto[] = [];

        for (const season of seasons) {
            const seasonRes: ResponseSeasonDto = new ResponseSeasonDto(season);
            seasonsRes.push(seasonRes);
        }

        return seasonsRes;
    }
}
