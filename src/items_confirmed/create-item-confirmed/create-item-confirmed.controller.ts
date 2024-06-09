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
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { ItemConfirmedDto } from '../shared/item_confirmed_dto'
import { parseItemConfirmed } from '../shared/parse_item_confirmed'
import { CreateItemConfirmedService } from './create-item-confirmed.service'

@ApiTags( 'items-confirmed' )
@Controller( 'items-confirmed' )
export class CreateItemConfirmedController {
	constructor( private readonly createItemConfirmedService: CreateItemConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Post()
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
		summary    : 'Create a order confirmed',
		description: 'Create a order confirmed json data'
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
	async createOrder(
		@Body() dto: ItemConfirmedDto
	): Promise<HttpResult> {
		try {

			const itemConfirmed = parseItemConfirmed( dto )

			await this.createItemConfirmedService.execute( UUID.from( dto.order_id ),
				itemConfirmed as ItemConfirmed )

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
