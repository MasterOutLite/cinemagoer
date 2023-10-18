import { Module } from '@nestjs/common';
import { VideoRateService } from './video-rate.service';

@Module({
  providers: [VideoRateService]
})
export class VideoRateModule {}
