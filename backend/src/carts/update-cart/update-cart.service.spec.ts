import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCartService } from './update-cart.service';

describe('UpdateCartService', () => {
  let service: UpdateCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCartService],
    }).compile();

    service = module.get<UpdateCartService>(UpdateCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
