import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { Product } from '~features/products/domain/models/product'
import { SearchProductService } from './search-product.service'

@ApiTags('products')
@Controller('products')
export class SearchProductController {
  constructor(private readonly searchProductService: SearchProductService,
  private readonly translation: TranslationService) {}

  @Get( 'search' )
  async searchProduct(
    @Query( 'name' ) name: string,
    @Query( 'to' ) to: string,
    @Query( 'from' ) from: string,
  ): Promise<HttpResultData<Product[]>> {
    try {
      const products = await this.searchProductService.searchProduct( name, to, from )
      return {
        data: products,
        statusCode: HttpStatus.OK
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message   : this.translation.translateAll( e )
      }
    }
  }
}
