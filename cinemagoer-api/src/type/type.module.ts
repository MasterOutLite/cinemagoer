import {Module} from '@nestjs/common';
import {TypeService} from './type.service';
import {TypeController} from './type.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import Type from "@src/type/type.model";

@Module({
  providers: [TypeService],
  controllers: [TypeController],
  imports:[
    SequelizeModule.forFeature([Type]),
  ],
  exports:[TypeService]
})
export class TypeModule {}
