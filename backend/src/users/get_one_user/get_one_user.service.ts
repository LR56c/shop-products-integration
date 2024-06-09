import { Injectable } from '@nestjs/common'
import { User } from 'features/user/domain/models/User'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { GetOneUser } from '~features/user/application/get_one_user'
import { UserDao } from '~features/user/domain/dao/UserDao'

@Injectable()
export class GetOneUserService {
	constructor( private repo: UserDao ) {
	}

	async getOneUser( email: string ): Promise<User> {
		const result = await GetOneUser( this.repo, email )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
