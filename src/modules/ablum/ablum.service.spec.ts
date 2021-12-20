import { Test, TestingModule } from '@nestjs/testing';
import { AblumService } from './ablum.service';

describe('AblumService', () => {
  let service: AblumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AblumService],
    }).compile();

    service = module.get<AblumService>(AblumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
