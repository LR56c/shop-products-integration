import { Controller } from '@nestjs/common';
import { OrdersConfirmedService } from './orders_confirmed.service';

@Controller('orders-confirmed')
export class OrdersConfirmedController {
  constructor(private readonly ordersConfirmedService: OrdersConfirmedService) {}
}
