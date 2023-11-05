import {Module} from '@nestjs/common';
import {GroupService} from './group.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {GroupController} from './group.controller';
import Group from "@src/group/group.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
    providers: [GroupService],
    imports: [
        SequelizeModule.forFeature([Group]),
        AuthModule
    ],
    controllers: [GroupController],
    exports: [
        GroupService
    ]
})
export class GroupModule {
}
