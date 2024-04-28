import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAllProductsService } from './delete-all-products.service';

describe('DeleteAllProductsService', () => {
  let service: DeleteAllProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteAllProductsService],
    }).compile();

    service = module.get<DeleteAllProductsService>(DeleteAllProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
