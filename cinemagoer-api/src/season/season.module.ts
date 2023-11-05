import {Module} from '@nestjs/common';
import {SeasonService} from './season.service';
import {SeasonController} from './season.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Season from "@src/season/season.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  providers: [SeasonService],
  controllers: [SeasonController],
  imports:[
    SequelizeModule.forFeature([Season]),
      AuthModule
  ],
  exports:[
      SeasonService
  ]
})
export class SeasonModule {}
