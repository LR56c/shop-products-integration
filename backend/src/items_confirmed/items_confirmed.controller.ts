import { Controller } from '@nestjs/common';
import { ItemsConfirmedService } from './items_confirmed.service';

@Controller('items-confirmed')
export class ItemsConfirmedController {
  constructor(private readonly itemsConfirmedService: ItemsConfirmedService) {}
}
