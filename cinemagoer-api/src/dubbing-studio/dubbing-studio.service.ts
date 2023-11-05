import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";
import {CreateDubbingStudioDto} from "@src/dubbing-studio/dto/create-dubbing-studio.dto";
import {ExistsException} from "@src/exception/ExistsException";
import {ResponseDubbingStudioDto} from "@src/dubbing-studio/dto/response-dubbing-studio.dto";

@Injectable()
export class DubbingStudioService {
    constructor(
        @InjectModel(DubbingStudio)
        private dubbingStudioRepository: typeof DubbingStudio,
    ) {
    }

    async create(dto: CreateDubbingStudioDto): Promise<ResponseDubbingStudioDto> {
        const exists = await this.dubbingStudioRepository.findOne({where: {name: dto.name}});
        if (exists)
            throw new ExistsException();

        const studio = await this.dubbingStudioRepository.create(dto);
        return new ResponseDubbingStudioDto(studio);
    }

    async getAll(): Promise<ResponseDubbingStudioDto[]> {
        const studios = await this.dubbingStudioRepository.findAll();
        const responses: ResponseDubbingStudioDto[] = [];
        for (const studio of studios) {
            const response = new ResponseDubbingStudioDto(studio);
            responses.push(response);
        }
        return responses;
    }

    async exists(id: number): Promise<boolean> {
        const dubbingStudio: DubbingStudio = await this.dubbingStudioRepository.findOne({where: {id}})
        return dubbingStudio !== null;
    }
}
