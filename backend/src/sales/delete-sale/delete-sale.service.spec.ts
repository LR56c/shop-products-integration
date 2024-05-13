import { Test, TestingModule } from '@nestjs/testing';
import { DeleteSaleService } from './delete-sale.service';

describe('DeleteSaleService', () => {
  let service: DeleteSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteSaleService],
    }).compile();

    service = module.get<DeleteSaleService>(DeleteSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
