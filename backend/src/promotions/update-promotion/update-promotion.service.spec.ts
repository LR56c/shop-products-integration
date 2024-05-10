import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePromotionService } from './update-promotion.service';

describe('UpdatePromotionService', () => {
  let service: UpdatePromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatePromotionService],
    }).compile();

    service = module.get<UpdatePromotionService>(UpdatePromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
