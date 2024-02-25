import {Module} from '@nestjs/common';
import {ListViewService} from './list-view.service';
import {AuthModule} from "@src/auth/auth.module";
import ListView from "@models/list-view/list-view.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: [ListViewService],
    controllers: [],
    imports: [
        TypeOrmModule.forFeature([ListView]),
        AuthModule
    ],
    exports: [ListViewService]
})
export class ListViewModule {
}
