import { Controller } from '@nestjs/common';
import { ShopsAddressService } from './shops_address.service';

@Controller('shops-address')
export class ShopsAddressController {
  constructor(private readonly shopsAddressService: ShopsAddressService) {}
}
