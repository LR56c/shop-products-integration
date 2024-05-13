import { Test, TestingModule } from '@nestjs/testing';
import { GetAllSaleService } from './get-all-sale.service';

describe('GetAllSaleService', () => {
  let service: GetAllSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllSaleService],
    }).compile();

    service = module.get<GetAllSaleService>(GetAllSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
