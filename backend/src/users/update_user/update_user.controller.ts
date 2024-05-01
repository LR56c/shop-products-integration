import {
	Body,
	Controller,
	HttpStatus,
	Param,
	Put
} from '@nestjs/common'
import {
	I18n,
	I18nContext
} from 'nestjs-i18n'
import { CreateUserDto } from 'src/users/create_user/create_user_dto'
import { parseUser } from 'src/users/shared/parseUser'
import { UpdateUserDto } from 'src/users/update_user/update_user_dto'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { InvalidRUTException } from '~features/user/domain/exceptions/InvalidRUTException'
import { RUT } from '~features/user/domain/models/RUT'
import { UpdateUserService } from './update_user.service'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { userFromJson } from '~features/user/application/user_mapper'
import { User } from '~features/user/domain/models/User'

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
							example: '123456789'
						},
						name : {
							type   : 'string',
							example: 'John Doe'
						},
						email: {
							type   : 'string',
							example: 'abc@gmail.com'
						},
						role : {
							type   : 'string',
							example: 'role'
						}
					}
				}
			}
		}
	} )
	async updateUser(
		@I18n() i18n: I18nContext,
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
