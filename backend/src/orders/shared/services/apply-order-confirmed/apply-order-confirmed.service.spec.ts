import { Test, TestingModule } from '@nestjs/testing';
import { ApplyOrderConfirmedService } from './apply-order-confirmed.service';

describe('ApplyOrderConfirmedService', () => {
  let service: ApplyOrderConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyOrderConfirmedService],
    }).compile();

    service = module.get<ApplyOrderConfirmedService>(ApplyOrderConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
