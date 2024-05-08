import { Test, TestingModule } from '@nestjs/testing';
import { GetAllPaymentService } from './get_all_payment.service';

describe('GetAllPaymentService', () => {
  let service: GetAllPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllPaymentService],
    }).compile();

    service = module.get<GetAllPaymentService>(GetAllPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
