import { Test, TestingModule } from '@nestjs/testing';
import { DeleteOrderController } from './delete-order.controller';
import { DeleteOrderService } from './delete-order.service';

describe('DeleteOrderController', () => {
  let controller: DeleteOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteOrderController],
      providers: [DeleteOrderService],
    }).compile();

    controller = module.get<DeleteOrderController>(DeleteOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
