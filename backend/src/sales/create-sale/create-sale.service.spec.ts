import { Test, TestingModule } from '@nestjs/testing';
import { CreateSaleService } from './create-sale.service';

describe('CreateSaleService', () => {
  let service: CreateSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSaleService],
    }).compile();

    service = module.get<CreateSaleService>(CreateSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
