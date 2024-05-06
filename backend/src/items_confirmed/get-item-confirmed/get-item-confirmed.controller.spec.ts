import { Test, TestingModule } from '@nestjs/testing';
import { GetItemConfirmedController } from './get-item-confirmed.controller';
import { GetItemConfirmedService } from './get-item-confirmed.service';

describe('GetItemConfirmedController', () => {
  let controller: GetItemConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetItemConfirmedController],
      providers: [GetItemConfirmedService],
    }).compile();

    controller = module.get<GetItemConfirmedController>(GetItemConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
