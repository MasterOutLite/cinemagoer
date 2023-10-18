import { Module } from '@nestjs/common';
import { DubbingStudioService } from './dubbing-studio.service';

@Module({
  providers: [DubbingStudioService]
})
export class DubbingStudioModule {}
