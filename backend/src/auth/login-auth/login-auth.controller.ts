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
import { LoginAuthService } from './login-auth.service'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class LoginAuthController {
	constructor( private readonly loginAuthService: LoginAuthService,
		private readonly translation: TranslationService
	)
	{}

	@Post( 'login' )
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
		summary    : 'Auth Login User',
		description: 'Authenticates a user with email and password'
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
	async login(
		@Body( 'email' ) email: string,
		@Body( 'password' ) password: string
	): Promise<HttpResultData<string>> {
		try {

			const result = await this.loginAuthService.login( email, password )
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
