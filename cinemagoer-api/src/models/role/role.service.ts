import {Injectable, NotFoundException} from '@nestjs/common';
import {ExistsException} from "@src/exception/ExistsException";
import Role from "@models/role/role.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {CreateRoleDto} from "@models/role/dto/create-role.dto";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {
    }

    async createRole(dto: CreateRoleDto) {
        dto.name.toUpperCase();
        const exists: Role = await this.roleRepository.findOne({where: {name: dto.name}});

        if (exists)
            throw new ExistsException();

        return await this.roleRepository.save(dto);
    }

    async getRoleByName(name: string) {
        const role = await this.roleRepository.findOne({where: {name}});
        if (!role)
            throw new NotFoundException(`Not found role by name: ${name}`);
        return role;

    }

    async getRoleById(id: number) {
        return await this.roleRepository.findOne({where: {id}});
    }

    async getRoleAll() {
        return await this.roleRepository.find();
    }

    async checkRole(ids: number[]): Promise<Role[]> {
        return await this.roleRepository.find({
            where: {
                id: In(ids)
            }
        });
    }
}
