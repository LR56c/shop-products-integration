import { Injectable } from '@nestjs/common'
import { DeleteUser } from '~features/user/application/delete_user'
import { UserDao } from '~features/user/domain/dao/UserDao'

@Injectable()
export class DeleteUserService {
	constructor( private repository: UserDao ) {
	}

	async deleteUser( email: string ): Promise<boolean> {
		return DeleteUser( this.repository, email )
	}
}
