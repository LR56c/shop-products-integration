import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import {
	Role,
	RoleEnum
} from '~features/shared/domain/value_objects/Role'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { userToJson } from '~features/user/application/user_mapper'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetUserService } from './get_user.service'


@ApiTags( 'users' )
@Controller( 'users' )
export class GetUserController {
	constructor( private readonly getUserService: GetUserService,
		private readonly translationService: TranslationService )
	{}

	@Get()
	@ApiQuery( {
		name    : 'role',
		type    : String,
		required: false
	} )
	@ApiQuery( {
		name    : 'name',
		type    : String,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all users',
		description: 'Get all users from a range of users, and optionally filter by name and role'
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
							type : 'array',
							items: {
								type      : 'object',
								properties: {
									rut          : {
										type   : 'string',
										example: 'string'
									},
									name          : {
										type   : 'string',
										example: 'string'
									},
									email          : {
										type   : 'string',
										example: 'string'
									},
									role_type          : {
										type   : 'string',
										example: 'string'
									},
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
	async getUser(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string,
		@Query( 'role' ) role?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {


			const users = await this.getUserService.getUser( from, to, role, name )

			let json: Record<string, any>[] = []
			for ( const user of users ) {
				json.push( userToJson( user ) )
			}

			return {
				statusCode: HttpStatus.OK,
				data      : json
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translationService.translateAll( e )
			}
		}
	}
}

