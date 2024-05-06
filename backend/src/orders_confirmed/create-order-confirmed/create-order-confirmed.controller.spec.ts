import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderConfirmedController } from './create-order-confirmed.controller';
import { CreateOrderConfirmedService } from './create-order-confirmed.service';

describe('CreateOrderConfirmedController', () => {
  let controller: CreateOrderConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateOrderConfirmedController],
      providers: [CreateOrderConfirmedService],
    }).compile();

    controller = module.get<CreateOrderConfirmedController>(CreateOrderConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
