import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderConfirmedService } from './update-order-confirmed.service';

describe('UpdateOrderConfirmedService', () => {
  let service: UpdateOrderConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateOrderConfirmedService],
    }).compile();

    service = module.get<UpdateOrderConfirmedService>(UpdateOrderConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
