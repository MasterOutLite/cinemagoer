import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "@src/guard/roles.decorator";
import {TokenFormat} from "@src/auth/dto/TokenFormat";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                throw new UnauthorizedException("Role bad requared Role");
            }

            const authHeader = req.headers.authorization;
            //console.log( req.headers);
            const token = authHeader.split(' ')[1];

            const user = this.jwtService.verify(token) as TokenFormat;
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role));
        } catch (e) {
            //console.log(e);
            throw new UnauthorizedException("Role bad");
        }
    }
}
