import { Test, TestingModule } from '@nestjs/testing';
import { OrdersConfirmedService } from './orders_confirmed.service';

describe('OrdersConfirmedService', () => {
  let service: OrdersConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersConfirmedService],
    }).compile();

    service = module.get<OrdersConfirmedService>(OrdersConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
