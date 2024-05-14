import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import {
	productFromJson,
	productToJson
} from '~features/products/application/product_mapper'
import { Product } from '~features/products/domain/models/product'
import { RecommendProduct } from '~features/products/domain/models/recommend_product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidRank } from '~features/shared/domain/value_objects/ValidRank'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { ProductDto } from '../shared/dto/product_dto'
import {
	GetRecommendProductDto,
	RecommendedProductDto
} from './get_recommend_product_dto'
import { RecommendProductService } from './recommend-product.service'

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
							id      : {
								type   : 'string',
								example: 'a032cf85-f26b-4e6d-b5a6-778303992614'
							},
							category: {
								type   : 'string',
								example: 'TEST'
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status : 200,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 200
						},
						data      : {
							type : 'array',
							items: {
								type      : 'object',
								properties: {
									category_name_of_products: {
										type : 'array',
										items: {
											type      : 'object',
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
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status : 400,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message   : {
							type      : 'object',
							properties: {
								code_error: {
									type   : 'string',
									example: 'error translation'
								}
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status     : 500,
		description: 'Internal server error by external operations',
		content    : {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						}
					}
				}
			}
		}
	} )
	async getRecommendProducts(
		@Body() dto: GetRecommendProductDto
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const data                    = this.parseRecommendProduct( dto )
			const productsGroupByCategory = await this.getRecommendProductService.recommendProductsGroupByCateogry(
				data.threshold, data.products, data.limit )

			let json: Record<string, any[]>[] = []

			productsGroupByCategory.forEach( ( productList, key ) => {
				const products = productList.map( product => productToJson( product ) )
				json.push( { [key]: products } )
			} )

			return {
				data      : json,
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

	parseRecommendProduct( dto: {
		threshold: number, products: RecommendedProductDto[], limit: number
	} ): {

		threshold: ValidRank, products: RecommendProduct[], limit: ValidInteger
	}
	{
		const errors: BaseException[]               = []
		const productResultList: RecommendProduct[] = []

		for ( const product of dto.products ) {
			const id = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( product.id ) )

			if ( id instanceof BaseException ) {
				errors.push( id )
			}

			const category = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( product.category ) )

			if ( category instanceof BaseException ) {
				errors.push( category )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			const productResult = new RecommendProduct(
				id as UUID, category as ValidString )

			productResultList.push( productResult )
		}

		const limit = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.limit ) )

		if ( limit instanceof BaseException ) {
			errors.push( limit )
		}

		const threshold = wrapType<ValidRank, InvalidIntegerException>(
			() => ValidRank.from( dto.threshold ) )

		if ( threshold instanceof BaseException ) {
			errors.push( threshold )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			threshold: threshold as ValidRank,
			products : productResultList,
			limit    : limit as ValidInteger
		}
	}
}
