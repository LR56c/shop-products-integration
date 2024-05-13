import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { NotImplementedException } from '~features/shared/domain/exceptions/NotImplementedException'
import { GetRecommendProductDto } from './get_recommend_product_dto'
import { RecommendProductService } from './recommend-product.service'
import { ProductDto } from '../shared/dto/product_dto'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import {
	productFromJson,
	productToJson
} from '~features/products/application/product_mapper'
import { Product } from '~features/products/domain/models/product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidRank } from '~features/shared/domain/value_objects/ValidRank'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class RecommendProductController {
	constructor( private readonly getRecommendProductService: RecommendProductService,
		private readonly translation: TranslationService )
	{}

	@Post( 'recommend' )
	@ApiOperation( {
		summary    : 'Get recommend products',
		description: 'Get recommend products by products related, threshold and limit'
	} )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				threshold: {
					type   : 'string',
					example: '2'
				},
				limit    : {
					type   : 'string',
					example: '2'
				},
				products : {
					type : 'array',
					items: {
						properties: {
							id          : {
								type   : 'string',
								example: 'uuid'
							},
							code        : {
								type   : 'string',
								example: 'string'
							},
							product_code: {
								type   : 'string',
								example: 'string'
							},
							name        : {
								type   : 'string',
								example: 'string'
							},
							description : {
								type   : 'string',
								example: 'string'
							},
							created_at  : {
								type   : 'string',
								example: 'date'
							},
							brand       : {
								type   : 'string',
								example: 'string'
							},
							price       : {
								type   : 'string',
								example: 'number'
							},
							image_url   : {
								type   : 'string',
								example: 'url'
							},
							stock       : {
								type   : 'string',
								example: 'number'
							},
							average_rank: {
								type   : 'string',
								example: 'decimal'
							},
							category    : {
								type   : 'string',
								example: 'string'
							}
						}
					}
				}
			}
		}
	} )
	async getRecommendProducts(
		@Body() dto: GetRecommendProductDto
		// ): Promise<HttpResultData<Record<string, any>[]>> {
	)
	{
		try {
			console.log( 'dto', dto )
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll(
					[ new NotImplementedException() ] )
			}

			// const { errors, data } = this.parseRecommendProduct( dto )
			//
			// if ( errors.length > 0 ) {
			// 	return {
			// 		statusCode: HttpStatus.BAD_REQUEST,
			// 		message   : this.translation.translateAll( errors )
			// 	}
			// }
			//
			// const productsGroupByCategory = await this.getRecommendProductService.recommendProductsGroupByCateogry(
			// 	data.threshold, data.products, data.limit )
			//
			// let json: Record<string, any[]>[] = []
			//
			// productsGroupByCategory.forEach( ( productList, key ) => {
			// 	const products = productList.map( product => productToJson( product ) )
			// 	json.push( { [key]: products } )
			// } )
			//
			// return {
			// 	data      : json,
			// 	statusCode: HttpStatus.OK
			// }
		}
		catch ( e ) {
			console.log( 'e' )
			console.log( e )
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}

	parseRecommendProduct( dto: {
		threshold: number, products: ProductDto[], limit: number
	} ): {
		errors: BaseException[],
		data: {
			threshold: ValidRank, products: Product[], limit: ValidInteger
		}
	}
	{
		const errors: BaseException[]      = []
		const productResultList: Product[] = []

		for ( const product of dto.products ) {
			const p = productFromJson( product )
			if ( !( p instanceof Product ) ) {
				errors.push( ...p )
				break
			}
			productResultList.push( p as Product )
		}

		const limit = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.limit ) )

		if ( limit instanceof InvalidIntegerException ) {
			errors.push( limit )
		}

		const threshold = wrapType<ValidRank, InvalidIntegerException>(
			() => ValidRank.from( dto.threshold ) )

		if ( threshold instanceof InvalidIntegerException ) {
			errors.push( threshold )
		}

		return {
			errors,
			data: {
				threshold: threshold as ValidRank,
				products : productResultList,
				limit    : limit as ValidInteger
			}
		}
	}
}
