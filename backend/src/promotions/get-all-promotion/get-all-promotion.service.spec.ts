import { Test, TestingModule } from '@nestjs/testing';
import { GetAllPromotionService } from './get-all-promotion.service';

describe('GetAllPromotionService', () => {
  let service: GetAllPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllPromotionService],
    }).compile();

    service = module.get<GetAllPromotionService>(GetAllPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
