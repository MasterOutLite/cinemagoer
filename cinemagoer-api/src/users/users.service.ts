import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import User from "@users/users.model";
import {CreateUserDto} from "@users/dto/create-user.dto";
import {ResponseUserDto} from "@users/dto/response-user.dto";
import {RoleService} from "@role/role.service";
import {FilesService, TypeFile} from "@src/files/files.service";
import Role from "@role/role.model";
import UserRole from "@role/user-role.model";
import {UserDto} from "@users/dto/user.dto";
import {UpdateUserDto} from "@users/dto/update-user.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {RoleUser} from "@src/const/role-const";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RoleService,
        private fileService: FilesService,
    ) {
    }

    async registration(dto: CreateUserDto) {
        const roleId = RoleUser.USER;
        const user = await this.userRepository.create(dto);
        await user.$set('role', [roleId]);

        await user.reload();
        return new UserDto(user,);
    }

    async updateUser(dto: UpdateUserDto, avatar: Express.Multer.File[], auth: TokenFormat): Promise<ResponseUserDto> {
        const user = await this.userRepository.findOne({where: {id: auth.id}});
        if (avatar && avatar[0]) {
            this.fileService.removeFile(user.avatar);
            user.avatar = this.fileService.createFile(TypeFile.AVATAR, avatar[0]);
        }

        if (dto.nickname)
            user.nickname = dto.nickname;

        await user.save()
        await user.reload({include: {model: Role}});
        return new ResponseUserDto(user);
    }

    async get(id: number): Promise<User> {
        return await this.userRepository.findOne({where: {id}});
    }

    async getUserAll(): Promise<ResponseUserDto[]> {
        const users = await this.userRepository.findAll({
            include: [
                {model: Role},
            ]
        });

        const responses: ResponseUserDto[] = [];
        for (const user of users) {
            const res = new ResponseUserDto(user);
            responses.push(res);

        }

        return responses;
    }

    async exists(id: number): Promise<boolean> {
        const user: User = await this.userRepository.findOne({where: {id}})
        return user !== null;
    }

    async getByEmail(email: string): Promise<User> {
        const user: User = await this.userRepository.findOne({where: {email}, include: {model: Role}})
        return user;
    }

}
