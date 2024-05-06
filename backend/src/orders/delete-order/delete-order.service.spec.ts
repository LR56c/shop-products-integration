import { Test, TestingModule } from '@nestjs/testing';
import { DeleteOrderService } from './delete-order.service';

describe('DeleteOrderService', () => {
  let service: DeleteOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteOrderService],
    }).compile();

    service = module.get<DeleteOrderService>(DeleteOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
