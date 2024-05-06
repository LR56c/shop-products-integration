import { Test, TestingModule } from '@nestjs/testing';
import { GetShopAddressService } from './get-shop-address.service';

describe('GetShopAddressService', () => {
  let service: GetShopAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetShopAddressService],
    }).compile();

    service = module.get<GetShopAddressService>(GetShopAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
