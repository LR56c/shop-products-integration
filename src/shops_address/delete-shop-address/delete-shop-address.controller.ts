import {
	Body,
	Controller,
	Delete,
	HttpStatus
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { DeleteShopAddressService } from './delete-shop-address.service'

@ApiTags( 'shops-address' )
@Controller( 'shops-address' )
export class DeleteShopAddressController {
	constructor( private readonly deleteShopAddressService: DeleteShopAddressService,
		private readonly translation: TranslationService
	)
	{}

	@Delete()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				name: {
					type   : 'string',
					example: 'Santiago'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Delete shop address',
		description: 'Delete shop address by name'
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
		@Body( 'name' ) name: string
	): Promise<HttpResult> {
		try {

			await this.deleteShopAddressService.deleteShopAddress( name )
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
