import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthDto} from "@src/auth/dto/auth.dto";
import {AuthService} from "@src/auth/auth.service";
import {CreateUserDto} from "@models/users/dto/create-user.dto";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }
}
