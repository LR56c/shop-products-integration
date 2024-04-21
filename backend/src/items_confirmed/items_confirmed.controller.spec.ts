import { Test, TestingModule } from '@nestjs/testing';
import { ItemsConfirmedController } from './items_confirmed.controller';
import { ItemsConfirmedService } from './items_confirmed.service';

describe('ItemsConfirmedController', () => {
  let controller: ItemsConfirmedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsConfirmedController],
      providers: [ItemsConfirmedService],
    }).compile();

    controller = module.get<ItemsConfirmedController>(ItemsConfirmedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
