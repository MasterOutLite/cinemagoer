import {Module} from '@nestjs/common';
import {AgeRatingService} from './age-rating.service';
import {AgeRatingController} from './age-rating.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import AgeRating from "@src/age-rating/age-rating.model";

@Module({
  providers: [AgeRatingService],
  controllers: [AgeRatingController],
  imports:[
    SequelizeModule.forFeature([AgeRating]),
  ],
  exports:[AgeRatingService]
})
export class AgeRatingModule {}
