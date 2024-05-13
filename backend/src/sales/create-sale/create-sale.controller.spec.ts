import { Test, TestingModule } from '@nestjs/testing';
import { CreateSaleController } from './create-sale.controller';
import { CreateSaleService } from './create-sale.service';

describe('CreateSaleController', () => {
  let controller: CreateSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateSaleController],
      providers: [CreateSaleService],
    }).compile();

    controller = module.get<CreateSaleController>(CreateSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
