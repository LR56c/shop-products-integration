import { Test, TestingModule } from '@nestjs/testing';
import { GetRecommendProductController } from './get-recommend-product.controller';
import { GetRecommendProductService } from './get-recommend-product.service';

describe('GetRecommendProductController', () => {
  let controller: GetRecommendProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetRecommendProductController],
      providers: [GetRecommendProductService],
    }).compile();

    controller = module.get<GetRecommendProductController>(GetRecommendProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
