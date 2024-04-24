import { Module } from '@nestjs/common';
import { DeleteProductService } from './delete-product.service';
import { DeleteProductController } from './delete-product.controller';

@Module({
  controllers: [DeleteProductController],
  providers: [DeleteProductService],
})
export class DeleteProductModule {}
