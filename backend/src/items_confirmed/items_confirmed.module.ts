import { Module } from '@nestjs/common';
import { ItemsConfirmedService } from './items_confirmed.service';
import { ItemsConfirmedController } from './items_confirmed.controller';

@Module({
  controllers: [ItemsConfirmedController],
  providers: [ItemsConfirmedService],
})
export class ItemsConfirmedModule {}
