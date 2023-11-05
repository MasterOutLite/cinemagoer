import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Group from "@src/group/group.model";
import {CreateGroupDto} from "@src/group/dto/create-group.dto";
import {ExistsException} from "@src/exception/ExistsException";
import {ResponseGroupDto} from "@src/group/dto/response-group.dto";

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group)
        private groupRepository: typeof Group,
    ) {
    }

    async create(dto: CreateGroupDto): Promise<ResponseGroupDto> {
        const exists = await this.groupRepository.findOne({where: {name: dto.name}});
        if (exists)
            throw new ExistsException();

        const group: Group = await this.groupRepository.create(dto);
        return new ResponseGroupDto(group);
    }

    async getAll(): Promise<ResponseGroupDto[]> {
        const groups: Group[] = await this.groupRepository.findAll();

        const response: ResponseGroupDto[] = [];
        for (const group of groups) {
            const dto: ResponseGroupDto = new ResponseGroupDto(group);
            response.push(dto);
        }
        return response;
    }

    async exists(id: number): Promise<boolean> {
        const group: Group = await this.groupRepository.findOne({where: {id}});
        return group !== null;
    }
}
