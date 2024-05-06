import { Test, TestingModule } from '@nestjs/testing';
import { DeleteOrderConfirmedService } from './delete-order-confirmed.service';

describe('DeleteOrderConfirmedService', () => {
  let service: DeleteOrderConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteOrderConfirmedService],
    }).compile();

    service = module.get<DeleteOrderConfirmedService>(DeleteOrderConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
