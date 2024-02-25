import {Module} from '@nestjs/common';
import {AgeRatingService} from './age-rating.service';
import {AgeRatingController} from './age-rating.controller';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import AgeRating from "@models/age-rating/age-rating.entity";

@Module({
    providers: [AgeRatingService],
    controllers: [AgeRatingController],
    imports: [
        TypeOrmModule.forFeature([AgeRating]),
        AuthModule
    ],
    exports: [AgeRatingService]
})
export class AgeRatingModule {
}
