import { Test, TestingModule } from '@nestjs/testing';
import { CastsController } from '../casts.controller';

describe('CastsController', () => {
  let controller: CastsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastsController],
    }).compile();

    controller = module.get<CastsController>(CastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
