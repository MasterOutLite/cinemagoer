import {Module} from '@nestjs/common';
import {SeasonService} from './season.service';
import {SeasonController} from './season.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Season from "@models/season/season.entity";

@Module({
    providers: [SeasonService],
    controllers: [SeasonController],
    imports: [
        TypeOrmModule.forFeature([Season]),
        AuthModule
    ],
    exports: [
        SeasonService
    ]
})
export class SeasonModule {
}
