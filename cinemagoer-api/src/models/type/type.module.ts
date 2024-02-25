import {Module} from '@nestjs/common';
import {TypeService} from './type.service';
import {TypeController} from './type.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Type from "@models/type/type.entity";

@Module({
    providers: [TypeService],
    controllers: [TypeController],
    imports: [
        TypeOrmModule.forFeature([Type]),
        AuthModule
    ],
    exports: [TypeService]
})
export class TypeModule {
}
