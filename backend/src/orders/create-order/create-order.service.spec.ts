import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderService } from './create-order.service';

describe('CreateOrderService', () => {
  let service: CreateOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrderService],
    }).compile();

    service = module.get<CreateOrderService>(CreateOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
