import { Test, TestingModule } from '@nestjs/testing';
import { GetSaleService } from './get-sale.service';

describe('GetSaleService', () => {
  let service: GetSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSaleService],
    }).compile();

    service = module.get<GetSaleService>(GetSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
