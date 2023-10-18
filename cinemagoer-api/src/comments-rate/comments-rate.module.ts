import { Module } from '@nestjs/common';
import { CommentsRateService } from './comments-rate.service';

@Module({
  providers: [CommentsRateService]
})
export class CommentsRateModule {}
