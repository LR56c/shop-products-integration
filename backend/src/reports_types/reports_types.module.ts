import { Module } from '@nestjs/common';
import { ReportsTypesService } from './reports_types.service';
import { ReportsTypesController } from './reports_types.controller';

@Module({
  controllers: [ReportsTypesController],
  providers: [ReportsTypesService],
})
export class ReportsTypesModule {}
