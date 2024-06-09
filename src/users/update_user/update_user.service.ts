import { Injectable } from '@nestjs/common'
import { EmailException } from 'packages/shared/domain/exceptions/EmailException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { Email } from 'packages/shared/domain/value_objects/email'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { GetOneUser } from 'packages/user/application/get_one_user'
import { UpdateUser } from 'packages/user/application/update_user'
import { UserDao } from 'packages/user/domain/dao/UserDao'
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

		if ( userSaved instanceof Errors ) {
			throw [...userSaved.values]
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
