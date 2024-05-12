import { Test, TestingModule } from '@nestjs/testing';
import { GetPromotionService } from './get-promotion.service';

describe('GetPromotionService', () => {
  let service: GetPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPromotionService],
    }).compile();

    service = module.get<GetPromotionService>(GetPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
