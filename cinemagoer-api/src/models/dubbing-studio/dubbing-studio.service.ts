import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";
import {CreateDubbingStudioDto} from "@models/dubbing-studio/dto/create-dubbing-studio.dto";
import {ExistsException} from "@src/exception/ExistsException";

@Injectable()
export class DubbingStudioService {
    constructor(
        @InjectRepository(DubbingStudio)
        private dubbingStudioRepository: Repository<DubbingStudio>,
    ) {
    }

    async create(dto: CreateDubbingStudioDto) {
        const exists = await this.dubbingStudioRepository.findOne({where: {name: dto.name}});
        if (exists)
            throw new ExistsException();

        return await this.dubbingStudioRepository.save(dto);
    }

    async getAll() {
        return await this.dubbingStudioRepository.find();
    }
}
