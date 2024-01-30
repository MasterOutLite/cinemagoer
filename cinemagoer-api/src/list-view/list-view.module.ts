import {Module} from '@nestjs/common';
import {ListViewService} from './list-view.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "@src/auth/auth.module";
import ListView from "@src/list-view/list-view.model";

@Module({
    providers: [ListViewService],
    controllers: [],
    imports: [
        SequelizeModule.forFeature([ListView]),
        AuthModule
    ],
    exports: [ListViewService]
})
export class ListViewModule {
}
