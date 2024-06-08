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
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'
import { wrapType } from '~features/shared/utils/wrap_type'
import { ShopAddress } from '~features/shop-address/domain/shop-address'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateShopAddressService } from './create-shop-address.service'

@ApiTags( 'shops-address' )
@Controller( 'shops-address' )
export class CreateShopAddressController {
	constructor( private readonly createShopAddressService: CreateShopAddressService,
		private readonly translation: TranslationService
	)
	{}

	@Post()
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
		summary: 'Create shop address'
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
	async createShopAddress( @Body( 'name' ) name: string ): Promise<HttpResult> {
		try {

			const nameResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( name ) )

			if ( nameResult instanceof InvalidStringException ) {
				throw [ new InvalidStringException( 'name' ) ]
			}

			await this.createShopAddressService.createShopAddress(
				new ShopAddress( nameResult as ValidString )
			)
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
