import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Type from "@src/type/type.model";
import {CreateTypeDto} from "@src/type/dto/create-type.dto";
import {ResponseTypeDto} from "@src/type/dto/response-type.dto";

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private typeRepository: typeof Type) {
    }

    async createType(dto: CreateTypeDto): Promise<ResponseTypeDto> {
        const exists: Type = await this.typeRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists type', HttpStatus.BAD_REQUEST);

        const type = await this.typeRepository.create(dto);
        return new ResponseTypeDto(type);
    }

    async getTypeAll(): Promise<ResponseTypeDto[]> {
        const types = await this.typeRepository.findAll();
        const typeDtos: ResponseTypeDto[] = [];


        for (const type of types) {
            typeDtos.push(new ResponseTypeDto(type));
        }
        return typeDtos;
    }

    async getOne(id: number): Promise<ResponseTypeDto> {
        const type: Type = await this.typeRepository.findOne({where: {id}})
        return new ResponseTypeDto(type);
    }

    async exists(id: number): Promise<boolean> {
        const type: Type = await this.typeRepository.findOne({where: {id}})
        return type !== null;
    }
}
