import {
  Body,
  Controller,
  Get,
  HttpStatus
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Product } from '~features/products/domain/models/product'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { productFromJson } from '~features/products/application/product_mapper'
import { GetRecommendProductService } from './get-recommend-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetRecommendProductController {
	constructor( private readonly getRecommendProductService: GetRecommendProductService,
    private readonly translation: TranslationService) {}

	@Get( 'recommend' )
	async getRecommendProducts(
		@Body( 'threshold' )
			threshold: number,
		@Body( 'Product' )
			productos: Product[],
		@Body( 'from' )
			from: string,
		@Body( 'to' )
			to: string
	)
	{
		try {
      const productResultList : Product[] = []

      for ( const producto of productos ) {
        const p = productFromJson( producto )
        if ( !( p instanceof Product ) ) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message   : this.translation.translateAll( p )
          }
        }
        productResultList.push( p as Product )
      }


			const products = await this.getRecommendProductService.getRecommendProducts(
				threshold,
				productResultList,
				from,
				to
			)
			return {
				data: products,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}
}
