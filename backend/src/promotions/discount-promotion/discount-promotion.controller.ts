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
import { PromotionProductDto } from 'src/promotions/shared/promotion_dto'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { promotionToJson } from '~features/discount_type/features/promotions/application/promotion_mapper'
import {
	productFromJson,
	productToJson
} from '~features/products/application/product_mapper'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { NotImplementedException } from '~features/shared/domain/exceptions/NotImplementedException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
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

	@Post( 'discount' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				products_ids: {
					type : 'array',
					items: {
						type   : 'string',
						example: '359b6378-f875-4d31-b415-d3de60a59875'
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
		@Body() dto: PromotionProductDto
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const products_ids_map: Map<string, UUID> = new Map()
			for ( const id of dto.products_ids ) {
				const idResult = wrapType<UUID, InvalidUUIDException>(
					() => UUID.from( id ) )

				if ( idResult instanceof BaseException ) {
					throw [ new InvalidUUIDException() ]
				}
				products_ids_map.set( id, idResult )
			}

			const result = await this.discountPromotionService.execute(
				products_ids_map )
			const json   = result.map( promotionToJson )
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
