import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {FilesModule} from "@src/files/files.module";
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "@models/users/users.entity";
import Role from "@models/role/role.entity";
import {RoleModule} from "@models/role/role.module";
import {UserListViewModule} from "@models/user-list-view/user-list-view.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User, Role,]),
        RoleModule, FilesModule, UserListViewModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {
}
