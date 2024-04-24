import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductController } from './search-product.controller';
import { SearchProductService } from './search-product.service';

describe('SearchProductController', () => {
  let controller: SearchProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchProductController],
      providers: [SearchProductService],
    }).compile();

    controller = module.get<SearchProductController>(SearchProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
