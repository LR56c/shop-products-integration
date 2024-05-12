import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { productFromJson } from '~features/products/application/product_mapper'
import { ProductDto } from '../../products/shared/dto/product_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { Product } from '~features/products/domain/models/product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { DiscountPromotionService } from './discount-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class DiscountPromotionController {
	constructor( private readonly discountPromotionService: DiscountPromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Get( 'discount' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				id               : {
					type   : 'string',
					example: '3643fe52-f496-4d1f-87b9-d81d71ddf62d'
				},
				order_id         : {
					type   : 'string',
					example: 'cb183faa-40f7-4023-8131-719232e34cf8'
				},
				creation_date    : {
					type   : 'string',
					example: '2024-04-27'
				},
				shop_keeper_email: {
					type   : 'string',
					example: 'ac@gmail.com'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Get discount by products',
		description: 'Get discount by products json data'
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
						data: {
							type   : 'object',
							properties:{
								discount: {
									type   : 'number',
									example: 1500
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
	async handle(
		@Body() dto: ProductDto[]
	): Promise<HttpResult> {
		try {

			const products : Product[] = []
			for ( const p of dto ) {
				const product = productFromJson( p )
				if ( !(product instanceof  Product)) {
					return {
						statusCode: HttpStatus.BAD_REQUEST,
						message   : this.translation.translateAll( product as BaseException[])
					}
				}
				products.push( product )
			}


			await this.discountPromotionService.execute( products )

			return {
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