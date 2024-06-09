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
import { userToJson } from 'packages/user/application/user_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetOneUserService } from './get_one_user.service'

@ApiTags( 'users' )
@Controller( 'users' )
export class GetOneUserController {
	constructor( private readonly getOneUserService: GetOneUserService,
		private readonly translation: TranslationService )
	{
	}

	@Get( ':email' )
	@ApiOperation( {
		summary    : 'Get one user',
		description: 'Get one user by email'
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
								auth_id: {
									type   : 'string',
									example: 'string'
								},
								rut    : {
									type   : 'string',
									example: 'string'
								},
								name   : {
									type   : 'string',
									example: 'string'
								},
								role   : {
									type   : 'string',
									example: 'string'
								},
								email  : {
									type   : 'string',
									example: 'string'
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
	async getOneUser(
		@Param( 'email' ) email: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {
			const user = await this.getOneUserService.getOneUser( email )
			return {
				statusCode: HttpStatus.OK,
				data      : userToJson( user )
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
