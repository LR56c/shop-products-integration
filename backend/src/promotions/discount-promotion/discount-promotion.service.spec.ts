import { Test, TestingModule } from '@nestjs/testing';
import { DiscountPromotionService } from './discount-promotion.service';

describe('DiscountPromotionService', () => {
  let service: DiscountPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountPromotionService],
    }).compile();

    service = module.get<DiscountPromotionService>(DiscountPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
