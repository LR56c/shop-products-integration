import { Injectable } from '@nestjs/common'
import { GetUser } from '~features/user/application/get_user'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { User } from '~features/user/domain/models/User'

@Injectable()
export class GetUserService {
	constructor( private repository: UserDao ) {}

	async getUser( from: number, to: number, role?: string,
		name?: string ): Promise<User[]> {
		return GetUser( this.repository, { from, to, role, name } )
	}
}
