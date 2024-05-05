import { Test, TestingModule } from '@nestjs/testing';
import { AddCartService } from './add-cart.service';

describe('AddCartService', () => {
  let service: AddCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddCartService],
    }).compile();

    service = module.get<AddCartService>(AddCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
