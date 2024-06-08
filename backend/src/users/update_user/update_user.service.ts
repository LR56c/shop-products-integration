import { Injectable } from '@nestjs/common'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { Email } from '~features/shared/domain/value_objects/email'
import { wrapType } from '~features/shared/utils/wrap_type'
import { GetOneUser } from '~features/user/application/get_one_user'
import { UpdateUser } from '~features/user/application/update_user'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { PartialUserDto } from 'src/users/dto/partial_user_dto'

@Injectable()
export class UpdateUserService {
	constructor( private repository: UserDao ) {}

	async updateUser( email: string, user: PartialUserDto ): Promise<boolean> {

		const emailResult = wrapType<Email, EmailException>(
			() => Email.from( email ) )

		if ( emailResult instanceof EmailException ) {
			throw [ new EmailException( 'email' ) ]
		}

		const userSaved = await GetOneUser( this.repository, (emailResult as Email).value)

		if ( userSaved instanceof BaseException ) {
			throw [userSaved]
		}

		const result = await UpdateUser( this.repository, userSaved, {
			rut  : user.rut,
			name : user.name,
			email: user.email,
			role : user.role
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
