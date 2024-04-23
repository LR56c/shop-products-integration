import { Test, TestingModule } from '@nestjs/testing';
import { ShopsAddressService } from './shops_address.service';

describe('ShopsAddressService', () => {
  let service: ShopsAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsAddressService],
    }).compile();

    service = module.get<ShopsAddressService>(ShopsAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
