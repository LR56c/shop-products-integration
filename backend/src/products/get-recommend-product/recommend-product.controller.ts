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
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { Product } from '~features/products/domain/models/product'
import { TranslationService } from '../../shared/services/translation/translation.service'
import {
	productFromJson,
	productToJson
} from '~features/products/application/product_mapper'
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
				limit: {
					type   : 'string',
					example: '2'
				},
				products: {
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
						product_code         : {
							type   : 'string',
							example: 'abc2'
						},
						name         : {
							type   : 'string',
							example: 'n'
						},
						description  : {
							type   : 'string',
							example: 'd'
						},
						created_at    : {
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
						category: {
							type   : 'string',
							example: 'TEST'
						}
					}
				}
			}
		}
	} )
	async getRecommendProducts(
		@Body( 'threshold' )
			threshold: string,
		@Body( 'products' )
			products: any,
		@Body( 'limit' )
			limit: string
	): Promise<HttpResultData<Record<string, any>[]>> {
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


			const productsGroupByCategory = await this.getRecommendProductService.recommendProductsGroupByCateogry(
				threshold,
				productResultList,
				limit,
			)

			let json : Record<string, any[]>[] = []

			productsGroupByCategory.forEach( ( productList, key ) => {
				const products = productList.map( product => productToJson( product ) )
				json.push( { [ key ]: products } )
			})

			return {
				data: json,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			console.log( "e" )
			console.log( e )
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}
}
