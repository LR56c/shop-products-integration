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
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { RefreshAuthService } from './refresh-auth.service'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class RefreshAuthController {
	constructor( private readonly refreshAuthService: RefreshAuthService,
		private readonly translation: TranslationService
	)
	{}

	@Post( 'refresh' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				email   : {
					type   : 'string',
					example: 'abc@gmail.com'
				},
				password: {
					type   : 'string',
					example: 'Abcd@1234'
				}

			}
		}
	} )
	@ApiOperation( {
		summary    : 'Auth Refresh Token',
		description: 'ReAuthenticates a user with token'
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
							type   : 'string',
							example: 'token'
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
	async refresh(
		@Body( 'token' ) token: string
	): Promise<HttpResultData<string>> {
		try {

			const result = await this.refreshAuthService.refresh( token )

			return {
				statusCode: HttpStatus.OK,
				data      : result.token.value
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
