import { Test, TestingModule } from '@nestjs/testing';
import { GetAllOrdersController } from './get-all-orders.controller';
import { GetAllOrdersService } from './get-all-orders.service';

describe('GetAllOrdersController', () => {
  let controller: GetAllOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllOrdersController],
      providers: [GetAllOrdersService],
    }).compile();

    controller = module.get<GetAllOrdersController>(GetAllOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
