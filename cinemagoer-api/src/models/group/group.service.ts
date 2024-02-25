import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import Group from "@models/group/group.entity";
import {Repository} from "typeorm";
import {CreateGroupDto} from "@models/group/dto/create-group.dto";
import {ExistsException} from "@src/exception/ExistsException";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
    ) {
    }

    async create(dto: CreateGroupDto) {
        const exists = await this.groupRepository.findOne({where: {name: dto.name}});
        if (exists)
            throw new ExistsException();

        return await this.groupRepository.save(dto);
    }

    async getAll() {
        return await this.groupRepository.find();
    }
}
