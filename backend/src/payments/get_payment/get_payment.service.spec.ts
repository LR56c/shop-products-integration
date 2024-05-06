import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentService } from './get_payment.service';

describe('GetPaymentService', () => {
  let service: GetPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPaymentService],
    }).compile();

    service = module.get<GetPaymentService>(GetPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
