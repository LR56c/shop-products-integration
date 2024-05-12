import { Test, TestingModule } from '@nestjs/testing';
import { GetAllPaymentController } from './get_all_payment.controller';
import { GetAllPaymentService } from './get_all_payment.service';

describe('GetAllPaymentController', () => {
  let controller: GetAllPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllPaymentController],
      providers: [GetAllPaymentService],
    }).compile();

    controller = module.get<GetAllPaymentController>(GetAllPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
