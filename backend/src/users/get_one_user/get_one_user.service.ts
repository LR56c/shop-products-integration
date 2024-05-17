import { Injectable } from '@nestjs/common'
import { User } from 'features/user/domain/models/User'
import { GetOneUser } from '~features/user/application/get_one_user'
import { UserDao } from '~features/user/domain/dao/UserDao'

@Injectable()
export class GetOneUserService {
	constructor( private repo: UserDao ) {
	}

	getOneUser( email: string ): Promise<User> {
		return GetOneUser( this.repo, email )
	}
}
