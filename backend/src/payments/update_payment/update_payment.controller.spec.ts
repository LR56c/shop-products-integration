import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePaymentController } from './update_payment.controller';
import { UpdatePaymentService } from './update_payment.service';

describe('UpdatePaymentController', () => {
  let controller: UpdatePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePaymentController],
      providers: [UpdatePaymentService],
    }).compile();

    controller = module.get<UpdatePaymentController>(UpdatePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
