import {Module} from '@nestjs/common';
import {GenreController} from './genre.controller';
import {GenreService} from './genre.service';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Genre from "@models/genre/genre.entity";

@Module({
    controllers: [GenreController],
    providers: [GenreService],
    imports: [
        TypeOrmModule.forFeature([Genre]),
        AuthModule
    ],
    exports: [GenreService]
})
export class GenreModule {
}
