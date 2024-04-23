import { Module } from '@nestjs/common';
import { OrdersConfirmedService } from './orders_confirmed.service';
import { OrdersConfirmedController } from './orders_confirmed.controller';

@Module({
  controllers: [OrdersConfirmedController],
  providers: [OrdersConfirmedService],
})
export class OrdersConfirmedModule {}
