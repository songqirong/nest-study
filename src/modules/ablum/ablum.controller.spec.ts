import { Test, TestingModule } from '@nestjs/testing';
import { AblumController } from './ablum.controller';

describe('AblumController', () => {
  let controller: AblumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AblumController],
    }).compile();

    controller = module.get<AblumController>(AblumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
