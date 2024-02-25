import {Module} from '@nestjs/common';
import {RoleController} from './role.controller';
import {RoleService} from './role.service';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Role from "@models/role/role.entity";
import User from "@models/users/users.entity";

@Module({

    controllers: [RoleController],
    providers: [RoleService],
    imports: [
        TypeOrmModule.forFeature([Role, User]),
        AuthModule
    ],
    exports: [RoleService]
})
export class RoleModule {
}
