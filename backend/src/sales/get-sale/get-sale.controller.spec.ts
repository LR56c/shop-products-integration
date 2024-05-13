import { Test, TestingModule } from '@nestjs/testing';
import { GetSaleController } from './get-sale.controller';
import { GetSaleService } from './get-sale.service';

describe('GetSaleController', () => {
  let controller: GetSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSaleController],
      providers: [GetSaleService],
    }).compile();

    controller = module.get<GetSaleController>(GetSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
