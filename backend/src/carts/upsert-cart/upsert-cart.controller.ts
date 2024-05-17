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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { CartDto } from '../dto/cart_dto'
import { UpsertCartService } from './upsert-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class UpsertCartController {
	constructor( private readonly upsertCartService: UpsertCartService,
		private readonly translation: TranslationService )
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				user_email: {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				product_id: {
					type   : 'string',
					example: '359b6378-f875-4d31-b415-d3de60a59875'
				},
				quantity  : {
					type   : 'number',
					example: 1
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Upsert cart',
		description: 'Upsert cart by json data. If the cart already exists, it will be updated. If it does not exist, it will be created.'
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
	async addCart( @Body() dto: CartDto ): Promise<HttpResult> {
		try {
			await this.upsertCartService.upsertCart( dto )
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
