import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query
} from '@nestjs/common'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { Product } from '~features/products/domain/models/product'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { productFromJson } from '~features/products/application/product_mapper'
import { RecommendProductService } from 'src/products/get-recommend-product/recommend-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class RecommendProductController {
	constructor( private readonly getRecommendProductService: RecommendProductService,
    private readonly translation: TranslationService) {}

	@Post( 'recommend' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				threshold: {
					type   : 'string',
					example: '2'
				},
				from: {
					type   : 'string',
					example: '2'
				},
				to: {
					type   : 'string',
					example: '2'
				},
				product: {
					type      : 'object',
					properties: {
						id           : {
							type   : 'string',
							example: '5bddb4cd-effb-4b49-a295-a8ad7dea82f1'
						},
						code         : {
							type   : 'string',
							example: 'abc'
						},
						name         : {
							type   : 'string',
							example: 'n'
						},
						description  : {
							type   : 'string',
							example: 'd'
						},
						create_at    : {
							type   : 'string',
							example: '2024-04-27'
						},
						brand        : {
							type   : 'string',
							example: 'b'
						},
						price        : {
							type   : 'number',
							example: 2
						},
						image_url    : {
							type   : 'string',
							example: 'http://img'
						},
						stock        : {
							type   : 'number',
							example: 2
						},
						rank         : {
							type   : 'number',
							example: 2
						},
						category_name: {
							type   : 'string',
							example: 'cn'
						}
					}
				}
			}
		}
	} )
	async getRecommendProducts(
		@Body( 'threshold' )
			threshold: string,
		@Body( 'product' )
			products: any,
		@Body( 'from' )
			from: string,
		@Body( 'to' )
			to: string
	)
	{
		try {
      const productResultList : Product[] = []

      for ( const product of products ) {
        const p = productFromJson( product )
        if ( !( p instanceof Product ) ) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message   : this.translation.translateAll( p )
          }
        }
        productResultList.push( p as Product )
      }


			const productsResult = await this.getRecommendProductService.recommendProducts(
				threshold,
				productResultList,
				from,
				to
			)
			return {
				data: productsResult,
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
