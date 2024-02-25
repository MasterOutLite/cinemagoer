import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import Status from "@models/status/status.entity";
import {CreateStatusDto} from "@models/status/dto/create-status.dto";

@Injectable()
export class StatusService {
    constructor(@InjectRepository(Status)
                private statusRepository: Repository<Status>) {
    }

    async create(dto: CreateStatusDto) {
        const exists: Status = await this.statusRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        return await this.statusRepository.save(dto);
    }

    async getAll() {
        return await this.statusRepository.find();
    }

    async getOne(id: number) {
        return await this.statusRepository.findOne({where: {id}});
    }
}
