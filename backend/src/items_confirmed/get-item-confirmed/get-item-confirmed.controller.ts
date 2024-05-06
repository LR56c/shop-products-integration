import {
	Controller,
	Get,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { itemConfirmedToJson } from '~features/item_confirmed/application/item_confimed_mapper'
import { orderConfirmedToJson } from '~features/order_confirmed/application/order_confirmed_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetItemConfirmedService } from './get-item-confirmed.service'

@ApiTags( 'items-confirmed' )
@Controller( 'items-confirmed' )
export class GetItemConfirmedController {
	constructor( private readonly getItemConfirmedService: GetItemConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Get( ':id' )
	@ApiOperation( {
		summary    : 'Get item confirmed',
		description: 'Get item confirmed by id'
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
								id              : {
									type   : 'string',
									example: 'uuid'
								},
								created_at      : {
									type   : 'string',
									example: 'date'
								},
								shop_keeper_email: {
									type   : 'string',
									example: 'email'
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
	async getOrder(
		@Param( 'id' ) id: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {
			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( id ) )

			if ( idResult instanceof BaseException ) {
				throw [ new InvalidUUIDException( 'id' ) ]
			}

			const result = await this.getItemConfirmedService.execute( idResult )

			return {
				statusCode: HttpStatus.OK,
				data      : itemConfirmedToJson( result )
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