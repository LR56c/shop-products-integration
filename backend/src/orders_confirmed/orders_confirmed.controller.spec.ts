import { Test, TestingModule } from '@nestjs/testing';
import { OrdersConfirmedController } from './orders_confirmed.controller';
import { OrdersConfirmedService } from './orders_confirmed.service';

describe('OrdersConfirmedController', () => {
  let controller: OrdersConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersConfirmedController],
      providers: [OrdersConfirmedService],
    }).compile();

    controller = module.get<OrdersConfirmedController>(OrdersConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
