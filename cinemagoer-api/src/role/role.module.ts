import {Module} from '@nestjs/common';
import {RoleController} from './role.controller';
import {RoleService} from './role.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Role from "@role/role.model";
import User from "@users/users.model";
import UserRole from "@role/user-role.model";

@Module({

    controllers: [RoleController],
    providers: [RoleService],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRole])
    ],
    exports: [RoleService]
})
export class RoleModule {
}
