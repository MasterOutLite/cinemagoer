import { Test, TestingModule } from '@nestjs/testing';
import { DubbingStudioService } from './dubbing-studio.service';

describe('DubbingStudioService', () => {
  let service: DubbingStudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DubbingStudioService],
    }).compile();

    service = module.get<DubbingStudioService>(DubbingStudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
