import { Test, TestingModule } from '@nestjs/testing';
import { ShopsAddressController } from './shops_address.controller';
import { ShopsAddressService } from './shops_address.service';

describe('ShopsAddressController', () => {
  let controller: ShopsAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsAddressController],
      providers: [ShopsAddressService],
    }).compile();

    controller = module.get<ShopsAddressController>(ShopsAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
