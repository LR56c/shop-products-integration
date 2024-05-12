import { Test, TestingModule } from '@nestjs/testing';
import { GetPromotionController } from './get-promotion.controller';
import { GetPromotionService } from './get-promotion.service';

describe('GetPromotionController', () => {
  let controller: GetPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPromotionController],
      providers: [GetPromotionService],
    }).compile();

    controller = module.get<GetPromotionController>(GetPromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
