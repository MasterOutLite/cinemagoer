import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import User from "@users/users.model";
import {CreateUserDto} from "@users/dto/create-user.dto";
import {ResponseUserDto} from "@users/dto/response-user.dto";
import {RoleService} from "@role/role.service";
import {FilesService, TypeFile} from "@src/files/files.service";
import Role from "@role/role.model";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RoleService,
        private fileService: FilesService,
    ) {
    }

    async createUser(dto: CreateUserDto, avatar: Express.Multer.File[]): Promise<ResponseUserDto> {
        const has = await this.userRepository.findOne({where: {email: dto.email}});
        if (has)
            throw new HttpException('This user already exists.', HttpStatus.BAD_REQUEST)

        if (avatar && avatar[0])
            dto.avatar = this.fileService.createFile(TypeFile.AVATAR, avatar[0]);

        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByName('USER'.toUpperCase())
        if (role)
            await user.$set('role', [role.id])
        const userRole: Role[] = await user.$get('role');
        return new ResponseUserDto(user.id, user.nickname, userRole, user.avatar);
    }

    async getUserAll(): Promise<User[]> {
        return await this.userRepository.findAll({
            include: [
                //{model: UserListView, attributes: ['id']},
                {model: Role, attributes: ['id', 'name']},
            ]
        });
    }

}
