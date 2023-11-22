import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import User from "@users/users.model";
import Role from "@role/role.model";
import UserRole from "@role/user-role.model";
import {RoleModule} from "@role/role.module";
import {FilesModule} from "@src/files/files.module";
import {AuthModule} from "@src/auth/auth.module";
import {UserListViewModule} from "@src/user-list-view/user-list-view.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole,]),
        RoleModule, FilesModule, UserListViewModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {
}
