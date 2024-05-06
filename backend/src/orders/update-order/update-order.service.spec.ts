import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderService } from './update-order.service';

describe('UpdateOrderService', () => {
  let service: UpdateOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateOrderService],
    }).compile();

    service = module.get<UpdateOrderService>(UpdateOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
