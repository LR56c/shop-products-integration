import { Module } from '@nestjs/common';
import { GetProductService } from './get-product.service';
import { GetProductController } from './get-product.controller';

@Module({
  controllers: [GetProductController],
  providers: [GetProductService],
})
export class GetProductModule {}
