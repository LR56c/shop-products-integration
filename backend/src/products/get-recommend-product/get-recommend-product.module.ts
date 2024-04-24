import { Module } from '@nestjs/common';
import { GetRecommendProductService } from './get-recommend-product.service';
import { GetRecommendProductController } from './get-recommend-product.controller';

@Module({
  controllers: [GetRecommendProductController],
  providers: [GetRecommendProductService],
})
export class GetRecommendProductModule {}
