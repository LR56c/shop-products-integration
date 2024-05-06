import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderConfirmedService } from './create-order-confirmed.service';

describe('CreateOrderConfirmedService', () => {
  let service: CreateOrderConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrderConfirmedService],
    }).compile();

    service = module.get<CreateOrderConfirmedService>(CreateOrderConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
