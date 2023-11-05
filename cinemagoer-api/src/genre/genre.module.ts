import {Module} from '@nestjs/common';
import {GenreController} from './genre.controller';
import {GenreService} from './genre.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Genre from "@src/genre/genre.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports:[
    SequelizeModule.forFeature([Genre]),
      AuthModule
  ],
  exports:[GenreService]
})
export class GenreModule {}
