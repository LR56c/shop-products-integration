import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderConfirmedService } from './get-order-confirmed.service';

describe('GetOrderConfirmedService', () => {
  let service: GetOrderConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrderConfirmedService],
    }).compile();

    service = module.get<GetOrderConfirmedService>(GetOrderConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
