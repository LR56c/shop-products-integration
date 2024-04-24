import { Test, TestingModule } from '@nestjs/testing';
import { GetRecommendProductService } from './get-recommend-product.service';

describe('GetRecommendProductService', () => {
  let service: GetRecommendProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRecommendProductService],
    }).compile();

    service = module.get<GetRecommendProductService>(GetRecommendProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
