import { Module } from '@nestjs/common';
import { UpdateProductService } from './update-product.service';
import { UpdateProductController } from './update-product.controller';

@Module({
  controllers: [UpdateProductController],
  providers: [UpdateProductService],
})
export class UpdateProductModule {}
