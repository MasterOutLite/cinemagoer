import {Module} from '@nestjs/common';
import {StatusController} from './status.controller';
import {StatusService} from './status.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Status from "@src/status/status.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports:[
    SequelizeModule.forFeature([Status]),
      AuthModule
  ],
  exports:[StatusService]
})
export class StatusModule {}
