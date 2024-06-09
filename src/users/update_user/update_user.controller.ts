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
import { PartialUserDto } from 'src/users/dto/partial_user_dto'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { UpdateUserService } from './update_user.service'

@ApiTags( 'users' )
@Controller( 'users' )
export class UpdateUserController {
	constructor( private readonly updateUserService: UpdateUserService,
		private readonly translation: TranslationService )
	{}

	@Put( ':email' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				user: {
					type      : 'object',
					properties: {
						auth_id: {
							type   : 'string',
							example: '668476f7-b08f-40b6-9e02-faa55aca49b1'
						},
						rut    : {
							type   : 'string',
							example: '123456789-7'
						},
						name   : {
							type   : 'string',
							example: 'John Doe'
						},
						role   : {
							type   : 'string',
							example: 'CLIENT'
						},
						email  : {
							type   : 'string',
							example: 'abc@gmail.com'
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update user',
		description: 'Update user by json data'
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
	async updateUser(
		@Param( 'email' ) email: string,
		@Body( 'user' ) dto: PartialUserDto
	): Promise<HttpResult> {
		try {

			await this.updateUserService.updateUser( email, dto )

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
