import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Status from "@src/status/status.model";
import {CreateStatusDto} from "@src/status/dto/create-status.dto";
import {ResponseStatusDto} from "@src/status/dto/response-status.dto";

@Injectable()
export class StatusService {
    constructor(@InjectModel(Status) private statusRepository: typeof Status) {
    }

    async create(dto: CreateStatusDto): Promise<CreateStatusDto> {
        const exists: Status = await this.statusRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        const status = await this.statusRepository.create(dto);
        return new ResponseStatusDto(status);
    }

    async getAll(): Promise<ResponseStatusDto[]> {
        const statuses = await this.statusRepository.findAll();
        const statusDtos: ResponseStatusDto[] = [];

        for (const status of statuses) {
            statusDtos.push(new ResponseStatusDto(status));
        }

        return statusDtos;
    }

    async getOne(id: number): Promise<ResponseStatusDto> {
        const status: Status = await this.statusRepository.findOne({where: {id}})
        return new ResponseStatusDto(status);
    }

    async exists(id: number): Promise<boolean> {
        const status: Status = await this.statusRepository.findOne({where: {id}})
        return status !== null;
    }
}
