import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import Role from "@role/role.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "@role/dto/create-role.dto";
import {ResponseRoleDto} from "@role/dto/response-role.dto";
import {ExistsException} from "@src/exception/ExistsException";

@Injectable()
export class RoleService {

    constructor(
        @InjectModel(Role)
        private roleRepository: typeof Role
    ) {
    }

    async createTest() {
        await this.roleRepository.create({name: 'gg', description: 'lg'});
    }

    async createRole(dto: CreateRoleDto): Promise<ResponseRoleDto> {
        const exists:Role = await this.roleRepository.findOne({where:{name: dto.name}});

        if (exists)
            throw new ExistsException();

        if (dto.description.length > 255)
            dto.description = dto.description.slice(0, 255);

        const role = await this.roleRepository.create(dto);
        return new ResponseRoleDto(role)
    }

    async getRoleByName(name: string): Promise<ResponseRoleDto> {
        const role = await this.roleRepository.findOne({where: {name}});
        if (role)
            return new ResponseRoleDto(role)
        else
            return null;
    }

    async getRoleAll(): Promise<ResponseRoleDto[]> {
        const roles = await this.roleRepository.findAll();
        const rolesDto: ResponseRoleDto[] = [];
        for (const role of roles) {
            rolesDto.push(new ResponseRoleDto(role));
        }
        return rolesDto;
    }
}
