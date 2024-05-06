import { Test, TestingModule } from '@nestjs/testing';
import { GetAllItemConfirmedController } from './get-all-item-confirmed.controller';
import { GetAllItemConfirmedService } from './get-all-item-confirmed.service';

describe('GetAllItemConfirmedController', () => {
  let controller: GetAllItemConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllItemConfirmedController],
      providers: [GetAllItemConfirmedService],
    }).compile();

    controller = module.get<GetAllItemConfirmedController>(GetAllItemConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
