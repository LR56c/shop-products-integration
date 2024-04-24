import { Module } from '@nestjs/common';
import { GetAllControllerService } from './get-all-controller.service';
import { GetAllControllerController } from './get-all-controller.controller';

@Module({
  controllers: [GetAllControllerController],
  providers: [GetAllControllerService],
})
export class GetAllControllerModule {}
