import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Put
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { promotionFromJson } from '~features/promotions/application/promotion_mapper'
import { Promotion } from '~features/promotions/domain/promotion'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { PromotionDto } from '../shared/promotion_dto'
import { UpdatePromotionService } from './update-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class UpdatePromotionController {
	constructor( private readonly updatePromotionService: UpdatePromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Put( ':id' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product: {
					type      : 'object',
					properties: {
						id          : {
							type   : 'string',
							example: 'aab298c3-6b7e-4c3e-b6fc-0817bb49837a'
						},
						code        : {
							type   : 'string',
							example: 'abc'
						},
						product_code: {
							type   : 'string',
							example: 'abc2'
						},
						name        : {
							type   : 'string',
							example: 'n'
						},
						description : {
							type   : 'string',
							example: 'd'
						},
						created_at  : {
							type   : 'string',
							example: '2024-04-27'
						},
						brand       : {
							type   : 'string',
							example: 'b'
						},
						price       : {
							type   : 'number',
							example: 2
						},
						image_url   : {
							type   : 'string',
							example: 'http://img.com/img.jpg'
						},
						stock       : {
							type   : 'number',
							example: 2.0
						},
						average_rank: {
							type   : 'number',
							example: 2
						},
						category    : {
							type   : 'string',
							example: 'TEST'
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update a promotion',
		description: 'Update a promotion by id and json data'
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
	async updateProduct(
		@Param( 'id' ) id: string,
		@Body( 'promotion' ) dto: PromotionDto
	): Promise<HttpResult> {
		try {
			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( id ) )

			if ( idResult instanceof BaseException ) {
				throw [ new InvalidUUIDException( 'id' ) ]
			}

			const p = promotionFromJson( dto )

			if ( !( p instanceof Promotion ) ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( p )
				}
			}

			await this.updatePromotionService.execute( idResult as UUID,
				p as Promotion )

			return {
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message   : this.translation.translateAll( e )
			}
		}
	}
}
