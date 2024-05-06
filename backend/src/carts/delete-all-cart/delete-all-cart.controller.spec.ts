import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAllCartController } from './delete-all-cart.controller';
import { DeleteAllCartService } from './delete-all-cart.service';

describe('DeleteAllCartController', () => {
  let controller: DeleteAllCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAllCartController],
      providers: [DeleteAllCartService],
    }).compile();

    controller = module.get<DeleteAllCartController>(DeleteAllCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
