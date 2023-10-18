import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Publisher from "@src/publisher/publisher.model";
import {CreatePublisherDto} from "@src/publisher/dto/create-publisher.dto";
import {ResponsePublisherDto} from "@src/publisher/dto/response-publisher.dto";

@Injectable()
export class PublisherService {
    constructor(@InjectModel(Publisher) private publisherRepository: typeof Publisher) {
    }

    async create(dto: CreatePublisherDto): Promise<CreatePublisherDto> {
        const exists: Publisher = await this.publisherRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists', HttpStatus.BAD_REQUEST);

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        const publisher = await this.publisherRepository.create(dto);
        return new ResponsePublisherDto(publisher);
    }

    async getAll(): Promise<ResponsePublisherDto[]> {
        const publishers = await this.publisherRepository.findAll();
        const publisherDtos: ResponsePublisherDto[] = [];

        for (const status of publishers) {
            publisherDtos.push(new ResponsePublisherDto(status));
        }

        return publisherDtos;
    }

    async getOne(id: number) {
        const publisher: Publisher = await this.publisherRepository.findOne({where: {id}});
        return new ResponsePublisherDto(publisher);
    }

    async exists(id: number): Promise<boolean> {
        const publisher: Publisher = await this.publisherRepository.findOne({where: {id}});
        return publisher !== null;
    }
}
