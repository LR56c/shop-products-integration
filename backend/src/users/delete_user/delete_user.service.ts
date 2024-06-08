import { Injectable } from '@nestjs/common'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { DeleteUser } from '~features/user/application/delete_user'
import { UserDao } from '~features/user/domain/dao/UserDao'

@Injectable()
export class DeleteUserService {
	constructor( private repository: UserDao ) {
	}

	async deleteUser( email: string ): Promise<boolean> {
		const result = await DeleteUser( this.repository, email )

		if ( result instanceof BaseException ) {
			throw [result]
		}

		return result
	}
}
