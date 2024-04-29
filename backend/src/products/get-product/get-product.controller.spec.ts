import { Test, TestingModule } from '@nestjs/testing';
import { GetProductController } from './get-product.controller';
import { GetProductService } from './get-product.service';

describe('GetProductController', () => {
  let controller: GetProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProductController],
      providers: [GetProductService],
    }).compile();

    controller = module.get<GetProductController>(GetProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
