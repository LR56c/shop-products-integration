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
import { productToJson } from '~features/products/application/product_mapper'
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
  ): Promise<HttpResultData<Record<string, any>[]>> {
    try {
      const products = await this.searchProductService.searchProduct( name, to, from )

      let json : Record<string, any>[] = []
      for ( const product of products ) {
        json.push( productToJson( product ) )
      }
      return {
        data: json,
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
