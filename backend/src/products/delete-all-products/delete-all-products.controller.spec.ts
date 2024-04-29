import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAllProductsController } from './delete-all-products.controller';
import { DeleteAllProductsService } from './delete-all-products.service';

describe('DeleteAllProductsController', () => {
  let controller: DeleteAllProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAllProductsController],
      providers: [DeleteAllProductsService],
    }).compile();

    controller = module.get<DeleteAllProductsController>(DeleteAllProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
