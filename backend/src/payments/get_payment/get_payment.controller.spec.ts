import { Test, TestingModule } from '@nestjs/testing';
import { GetPaymentController } from './get_payment.controller';
import { GetPaymentService } from './get_payment.service';

describe('GetPaymentController', () => {
  let controller: GetPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetPaymentController],
      providers: [GetPaymentService],
    }).compile();

    controller = module.get<GetPaymentController>(GetPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
