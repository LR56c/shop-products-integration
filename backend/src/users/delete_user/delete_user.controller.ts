import {
	Controller,
	Delete,
	HttpStatus,
	Param
} from '@nestjs/common'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { DeleteUserDto } from 'src/users/delete_user/delete_user_dto'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { wrapType } from '~features/shared/utils/WrapType'
import { DeleteUserService } from './delete_user.service'
import { ApiTags } from '@nestjs/swagger'
import { HttpResult } from '../../shared/utils/HttpResult'

@ApiTags( 'users' )
@Controller( 'users' )
export class DeleteUserController {
	constructor( private readonly deleteUserService: DeleteUserService,
		private readonly translation: TranslationService) {}

	@Delete( ':email' )
	async deleteUser(
		@Param() dto: DeleteUserDto
	): Promise<HttpResult> {
		try {
			const email = wrapType<Email, BaseException>(
				() => Email.from( dto.email ) )

			if ( email instanceof BaseException ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message: this.translation.translateAll( [email])
				}
			}

			await this.deleteUserService.deleteUser( email )
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
