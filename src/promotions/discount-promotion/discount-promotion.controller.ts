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
import { promotionResponseToJson } from 'packages/discount_type/features/promotions/application/promotion_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { DiscounDto } from '../shared/promotion_dto'
import { DiscountPromotionService } from './discount-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class DiscountPromotionController {
	constructor( private readonly discountPromotionService: DiscountPromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Post( 'discount' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				products: {
					type : 'array',
					items: {
						type      : 'object',
						properties: {
							quantity  : {
								type   : 'number',
								example: 1
							},
							product_id: {
								type   : 'string',
								example: '359b6378-f875-4d31-b415-d3de60a59875'
							}
						}
					}
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
						data      : {
							type      : 'object',
							properties: {
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
		@Body() dto: DiscounDto
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {


			const result = await this.discountPromotionService.execute( dto )

			const json = result.map( promotionResponseToJson )
			// formato alternativo: {promotion, totalProducts, totalPromotion, products[] } []

			return {
				statusCode: HttpStatus.OK,
				data      : json
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
