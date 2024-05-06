import { Test, TestingModule } from '@nestjs/testing';
import { GetAllCartController } from './get-all-cart.controller';
import { GetAllCartService } from './get-all-cart.service';

describe('GetAllCartController', () => {
  let controller: GetAllCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllCartController],
      providers: [GetAllCartService],
    }).compile();

    controller = module.get<GetAllCartController>(GetAllCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
