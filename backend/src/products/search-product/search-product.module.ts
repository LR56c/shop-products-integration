import { Module } from '@nestjs/common';
import { SearchProductService } from './search-product.service';
import { SearchProductController } from './search-product.controller';

@Module({
  controllers: [SearchProductController],
  providers: [SearchProductService],
})
export class SearchProductModule {}
