import { Test, TestingModule } from '@nestjs/testing';
import { ItemsConfirmedService } from './items_confirmed.service';

describe('ItemsConfirmedService', () => {
  let service: ItemsConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsConfirmedService],
    }).compile();

    service = module.get<ItemsConfirmedService>(ItemsConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
