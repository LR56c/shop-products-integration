import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentController } from './create_payment.controller';
import { CreatePaymentService } from './create_payment.service';

describe('CreatePaymentController', () => {
  let controller: CreatePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePaymentController],
      providers: [CreatePaymentService],
    }).compile();

    controller = module.get<CreatePaymentController>(CreatePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
