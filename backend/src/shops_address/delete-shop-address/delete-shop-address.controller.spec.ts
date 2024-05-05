import { Test, TestingModule } from '@nestjs/testing';
import { DeleteShopAddressController } from './delete-shop-address.controller';
import { DeleteShopAddressService } from './delete-shop-address.service';

describe('DeleteShopAddressController', () => {
  let controller: DeleteShopAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteShopAddressController],
      providers: [DeleteShopAddressService],
    }).compile();

    controller = module.get<DeleteShopAddressController>(DeleteShopAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
