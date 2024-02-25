import {Module} from '@nestjs/common';
import {GroupService} from './group.service';
import {GroupController} from './group.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Group from "@models/group/group.entity";

@Module({
    providers: [GroupService],
    imports: [
        TypeOrmModule.forFeature([Group]),
        AuthModule
    ],
    controllers: [GroupController],
    exports: [
        GroupService
    ]
})
export class GroupModule {
}
