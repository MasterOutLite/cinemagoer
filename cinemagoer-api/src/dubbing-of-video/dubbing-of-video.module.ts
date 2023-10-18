import { Module } from '@nestjs/common';
import { DubbingOfVideoService } from './dubbing-of-video.service';

@Module({
  providers: [DubbingOfVideoService]
})
export class DubbingOfVideoModule {}
