import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Type from "@models/type/type.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTypeDto} from "@models/type/dto/create-type.dto";

@Injectable()
export class TypeService {
    constructor(@InjectRepository(Type)
                private typeRepository: Repository<Type>) {
    }

    async createType(dto: CreateTypeDto) {
        const exists: Type = await this.typeRepository.findOne({where: {name: dto.name}})
        if (exists)
            throw new HttpException('Exists type', HttpStatus.BAD_REQUEST);

        return await this.typeRepository.save(dto);
    }

    async getTypeAll() {
        return await this.typeRepository.find();
    }

    async getOne(id: number) {
        return await this.typeRepository.findOne({where: {id}});
    }

}
