import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCartController } from './update-cart.controller';
import { UpdateCartService } from './update-cart.service';

describe('UpdateCartController', () => {
  let controller: UpdateCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCartController],
      providers: [UpdateCartService],
    }).compile();

    controller = module.get<UpdateCartController>(UpdateCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
