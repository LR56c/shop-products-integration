import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductService } from './update-product.service';

describe('UpdateProductService', () => {
  let service: UpdateProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProductService],
    }).compile();

    service = module.get<UpdateProductService>(UpdateProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
