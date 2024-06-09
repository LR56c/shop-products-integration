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
import { AuthUserDto } from '../shared/auth_user_dto'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { RegisterAuthService } from './register-auth.service'

@ApiTags( 'auth' )
@Controller( 'auth' )
export class RegisterAuthController {
	constructor( private readonly registerAuthService: RegisterAuthService,
		private readonly translation: TranslationService
	)
	{}

	@Post( 'register' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				password: {
					type   : 'string',
					example: 'Abcd@1234'
				},
				user    : {
					type      : 'object',
					properties: {
						rut  : {
							type   : 'string',
							example: '123456789-7'
						},
						name : {
							type   : 'string',
							example: 'John Doe'
						},
						role : {
							type   : 'string',
							example: 'CLIENT'
						},
						email: {
							type   : 'string',
							example: 'abc@gmail.com'
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Auth Register User',
		description: 'Register a user with email, password and user data'
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
	async register(
		@Body( 'password' ) password: string,
		@Body( 'user' ) dto: AuthUserDto
	): Promise<HttpResultData<string>> {
		try {
			const result = await this.registerAuthService.register(
				dto,
				password
			)

			return {
				statusCode: HttpStatus.OK,
				data      : result.token.value
			}
		}
		catch ( e ) {
			console.log( 'e ' )
			console.log( e )
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}
}
