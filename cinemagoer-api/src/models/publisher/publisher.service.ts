import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import Publisher from "@models/publisher/publisher.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePublisherDto} from "@models/publisher/dto/create-publisher.dto";

@Injectable()
export class PublisherService {
    constructor(@InjectRepository(Publisher)
                private publisherRepository: Repository<Publisher>) {
    }

    async create(dto: CreatePublisherDto) {
        const exists: Publisher = await this.publisherRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        return await this.publisherRepository.save(dto);
    }

    async getAll() {
        return await this.publisherRepository.find();
    }

    async getOne(id: number) {
        return await this.publisherRepository.findOne({where: {id}});
    }

}
