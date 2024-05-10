import { Test, TestingModule } from '@nestjs/testing';
import { DiscountPromotionController } from './discount-promotion.controller';
import { DiscountPromotionService } from './discount-promotion.service';

describe('DiscountPromotionController', () => {
  let controller: DiscountPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountPromotionController],
      providers: [DiscountPromotionService],
    }).compile();

    controller = module.get<DiscountPromotionController>(DiscountPromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
