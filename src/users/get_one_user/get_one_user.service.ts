import { Injectable } from '@nestjs/common'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { GetOneUser } from '../../../packages/user/application/get_one_user'
import { UserDao } from '../../../packages/user/domain/dao/UserDao'
import { User } from '../../../packages/user/domain/models/User'

@Injectable()
export class GetOneUserService {
	constructor( private repo: UserDao ) {
	}

	async getOneUser( email: string ): Promise<User> {
		const result = await GetOneUser( this.repo, email )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
