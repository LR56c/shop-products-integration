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
import { CreateUserDto } from 'src/users/create_user/create_user_dto'
import { parseUser } from 'src/users/shared/parseUser'
import { User } from '~features/user/domain/models/User'
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateUserService } from './create_user.service'

@ApiTags( 'users' )
@Controller( 'users' )
export class CreateUserController {
	constructor( private readonly createUserService: CreateUserService,
		private readonly translationService: TranslationService )
	{
	}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				user: {
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
		summary: 'Create user',
		description: 'Create user by json data',
	} )
	@ApiResponse( {
		status     : 200,
		content: {
			'application/json': {
				schema: {
					type: 'object',
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
		status     : 400,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message: {
							type      : 'object',
							properties: {
								code_error   : {
									type   : 'string',
									example: 'error translation'
								},
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
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						},
					}
				}
			}
		}
	} )
	async createUser(
		@Body( 'user' ) dto: CreateUserDto
	): Promise<HttpResult> {
		try {
			const { errors, data } = parseUser( dto )

			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translationService.translateAll( errors )
				}
			}

			await this.createUserService.createUser( new User(
				data.rut,
				data.name,
				data.email,
				data.role,
			) )

			return {
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			}
		}
	}
}


