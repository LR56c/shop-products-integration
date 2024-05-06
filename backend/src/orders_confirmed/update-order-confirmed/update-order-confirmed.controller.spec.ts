import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderConfirmedController } from './update-order-confirmed.controller';
import { UpdateOrderConfirmedService } from './update-order-confirmed.service';

describe('UpdateOrderConfirmedController', () => {
  let controller: UpdateOrderConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateOrderConfirmedController],
      providers: [UpdateOrderConfirmedService],
    }).compile();

    controller = module.get<UpdateOrderConfirmedController>(UpdateOrderConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
