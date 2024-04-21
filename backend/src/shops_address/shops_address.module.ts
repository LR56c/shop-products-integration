import { Module } from '@nestjs/common';
import { ShopsAddressService } from './shops_address.service';
import { ShopsAddressController } from './shops_address.controller';

@Module({
  controllers: [ShopsAddressController],
  providers: [ShopsAddressService],
})
export class ShopsAddressModule {}
