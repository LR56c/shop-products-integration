import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderController } from './update-order.controller';
import { UpdateOrderService } from './update-order.service';

describe('UpdateOrderController', () => {
  let controller: UpdateOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateOrderController],
      providers: [UpdateOrderService],
    }).compile();

    controller = module.get<UpdateOrderController>(UpdateOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
