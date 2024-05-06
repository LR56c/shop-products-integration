import { Test, TestingModule } from '@nestjs/testing';
import { AddCartController } from './add-cart.controller';
import { AddCartService } from './add-cart.service';

describe('AddCartController', () => {
  let controller: AddCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddCartController],
      providers: [AddCartService],
    }).compile();

    controller = module.get<AddCartController>(AddCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
