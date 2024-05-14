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
import { PartialPromotionProduct } from '~features/discount_type/features/promotions/domain/promotion'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { parsePromotion } from '../shared/parsePromotion'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { PromotionDto } from '../shared/promotion_dto'
import { CreatePromotionService } from './create-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class CreatePromotionController {
	constructor( private readonly createPromotionService: CreatePromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Post()
	@ApiBody( {
			schema: {
				type      : 'object',
				properties: {
					id        : {
						type   : 'string',
						example: '3643fe52-f496-4d1f-87b9-d81d71ddf62d'
					},
					name      : {
						type   : 'string',
						example: 'abc'
					},
					percentage: {
						type   : 'number',
						example: 20
					},
					created_at: {
						type   : 'string',
						example: '2024-04-27'
					},
					end_date  : {
						type   : 'string',
						example: '2024-04-27'
					},
					start_date: {
						type   : 'string',
						example: '2024-04-27'
					},
					products  : {
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
		}
	)
	@ApiOperation( {
		summary    : 'Create a promotion',
		description: 'Create a promotion with json data'
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
		@Body() promotionDto: PromotionDto
	): Promise<HttpResult> {
		try {
			const promotion = parsePromotion( promotionDto )

			const errors: BaseException[]             = []
			const products: PartialPromotionProduct[] = []
			for ( const p of promotionDto.products ) {

				const id = wrapType<UUID, InvalidUUIDException>(
					() => UUID.from( p.product_id ) )

				if ( id instanceof BaseException ) {
					errors.push( id )
				}


				const q = wrapType<ValidInteger, InvalidIntegerException>(
					() => ValidInteger.from( p.quantity ) )

				if ( q instanceof BaseException ) {
					errors.push( q )
				}

				if ( errors.length > 0 ) {
					throw errors
				}

				products.push( new PartialPromotionProduct(
					q as ValidInteger,
					id as UUID
				) )
			}

			await this.createPromotionService.execute( promotion, products )

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
