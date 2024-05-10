import { Test, TestingModule } from '@nestjs/testing';
import { DeletePromotionService } from './delete-promotion.service';

describe('DeletePromotionService', () => {
  let service: DeletePromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePromotionService],
    }).compile();

    service = module.get<DeletePromotionService>(DeletePromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
