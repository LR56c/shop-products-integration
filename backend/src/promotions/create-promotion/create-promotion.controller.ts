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
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
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
					products_ids: {
						type : 'array',
						items: {
							example: '359b6378-f875-4d31-b415-d3de60a59875'
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

			const products_ids: UUID[] = []
			for ( const p of promotionDto.products_ids ) {

				const id = wrapType<UUID, InvalidUUIDException>(
					() => UUID.from( p ) )

				if ( id instanceof BaseException ) {
					throw [ new InvalidUUIDException() ]
				}

				products_ids.push( id as UUID )
			}

			await this.createPromotionService.execute( promotion, products_ids )

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
