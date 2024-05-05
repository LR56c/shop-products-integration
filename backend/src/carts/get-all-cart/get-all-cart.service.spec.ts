import { Test, TestingModule } from '@nestjs/testing';
import { GetAllCartService } from './get-all-cart.service';

describe('GetAllCartService', () => {
  let service: GetAllCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllCartService],
    }).compile();

    service = module.get<GetAllCartService>(GetAllCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
