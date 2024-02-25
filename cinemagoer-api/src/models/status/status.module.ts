import {Module} from '@nestjs/common';
import {StatusController} from './status.controller';
import {StatusService} from './status.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Status from "@models/status/status.entity";

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports:[
    TypeOrmModule.forFeature([Status]),
      AuthModule
  ],
  exports:[StatusService]
})
export class StatusModule {}
