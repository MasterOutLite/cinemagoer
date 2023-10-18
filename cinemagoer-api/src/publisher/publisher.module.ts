import {Module} from '@nestjs/common';
import {PublisherController} from './publisher.controller';
import {PublisherService} from './publisher.service';
import {SequelizeModule} from "@nestjs/sequelize";
import Publisher from "@src/publisher/publisher.model";

@Module({
  controllers: [PublisherController],
  providers: [PublisherService],
  imports:[
    SequelizeModule.forFeature([Publisher]),
  ],
  exports:[PublisherService]
})
export class PublisherModule {}
