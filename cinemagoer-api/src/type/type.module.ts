import {Module} from '@nestjs/common';
import {TypeService} from './type.service';
import {TypeController} from './type.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Type from "@src/type/type.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  providers: [TypeService],
  controllers: [TypeController],
  imports:[
    SequelizeModule.forFeature([Type]),
      AuthModule
  ],
  exports:[TypeService]
})
export class TypeModule {}
