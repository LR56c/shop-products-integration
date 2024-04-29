import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductService } from './search-product.service';

describe('SearchProductService', () => {
  let service: SearchProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchProductService],
    }).compile();

    service = module.get<SearchProductService>(SearchProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
