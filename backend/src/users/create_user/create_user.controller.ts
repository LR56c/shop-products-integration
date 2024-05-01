import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
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
				data.email,
				data.name,
				data.role
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


