import { Injectable } from '@nestjs/common'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { GetUser } from '~features/user/application/get_user'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { User } from '~features/user/domain/models/User'

@Injectable()
export class GetUserService {
	constructor( private repository: UserDao ) {}

	async getUser( from: number, to: number, role?: string,
		name?: string ): Promise<User[]> {
		const result = await GetUser( this.repository, { from, to, role, name } )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
