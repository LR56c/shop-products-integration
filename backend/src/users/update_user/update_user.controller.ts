import {
	Body,
	Controller,
	HttpStatus,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import {
	I18n,
	I18nContext
} from 'nestjs-i18n'
import { parseUser } from 'src/users/shared/parseUser'
import { UpdateUserDto } from 'src/users/update_user/update_user_dto'
import { User } from '~features/user/domain/models/User'
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
	async updateUser(
		@Body( 'user' ) dto: UpdateUserDto
	): Promise<HttpResult> {
		try {
			const { errors, data } = parseUser(dto)

			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message: this.translation.translateAll( errors)
				}
			}

			await this.updateUserService.updateUser( data.email, new User(
				data.rut,
				data.name,
				data.email,
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
