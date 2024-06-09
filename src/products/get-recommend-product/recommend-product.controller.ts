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
import { productResponseToJson } from 'packages/products/application/product_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetRecommendProductDto } from '../shared/dto/get_recommend_product_dto'
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
			const productsGroupByCategory = await this.getRecommendProductService.recommendProductsGroupByCateogry(
				dto )

			let json: Record<string, any[]>[] = []

			productsGroupByCategory.forEach( ( productList, key ) => {
				const products = productList.map(
					product => productResponseToJson( product ) )
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
}
