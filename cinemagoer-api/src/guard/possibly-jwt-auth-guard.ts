import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {TokenFormat} from "@src/auth/dto/TokenFormat";

@Injectable()
export class PossiblyJwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];

            req.user = this.jwtService.verify(token) as TokenFormat;
        } catch (e) {
            console.log(e)
        }
        return true;
    }
}
