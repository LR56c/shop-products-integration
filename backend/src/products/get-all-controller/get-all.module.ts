import { Module } from '@nestjs/common';
import { GetAllService } from 'src/products/get-all-controller/get-all.service';
import { GetAllController } from 'src/products/get-all-controller/get-all.controller';

@Module({
  controllers: [GetAllController],
  providers: [GetAllService],
})
export class GetAllModule {}
