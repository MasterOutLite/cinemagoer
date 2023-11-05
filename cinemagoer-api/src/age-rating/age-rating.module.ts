import {Module} from '@nestjs/common';
import {AgeRatingService} from './age-rating.service';
import {AgeRatingController} from './age-rating.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import AgeRating from "@src/age-rating/age-rating.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
  providers: [AgeRatingService],
  controllers: [AgeRatingController],
  imports:[
    SequelizeModule.forFeature([AgeRating]),
      AuthModule
  ],
  exports:[AgeRatingService]
})
export class AgeRatingModule {}
