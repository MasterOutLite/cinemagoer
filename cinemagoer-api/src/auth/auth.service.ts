import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthDto} from "@src/auth/dto/auth.dto";
import {UsersService} from "@users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "@users/dto/create-user.dto";
import {ExistsException} from "@src/exception/ExistsException";
import * as bcrypt from 'bcryptjs'
import {UserDto} from "@users/dto/user.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async login(dto: AuthDto) {
        console.log(dto);
        const user: UserDto = await this.validation(dto);
        return this.generateToken(user);
    }

    async registration(dto: CreateUserDto) {
        const exists = await this.usersService.getByEmail(dto.email);
        if (exists)
            throw new ExistsException(`User already registration with email: ${dto.email}.`);

        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user: UserDto = await this.usersService.registration({...dto, password: hashPassword})
        return this.generateToken(user);
    }

    private generateToken(user: UserDto) {
        const payload: TokenFormat = {id: user.id, nickname: user.nickname, roles: user.roles}
        return {token: this.jwtService.sign(payload)}
    }

    private async validation(dto: AuthDto) {
        const user = await this.usersService.getByEmail(dto.login);
        if (!user)
            throw new UnauthorizedException('Bad email or password.');

        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEquals) {
            return new UserDto(user);
        }
        throw new UnauthorizedException('Bad email or password.');
    }

    //seed

    async registrationSeed(dto: CreateUserDto) {
        const exists = await this.usersService.getByEmail(dto.email);
        if (exists)
            throw new ExistsException(`User already registration with email: ${dto.email}.`);

        const hashPassword = await bcrypt.hash(dto.password, 5)
        return await this.usersService.registration({...dto, password: hashPassword});
    }
}
