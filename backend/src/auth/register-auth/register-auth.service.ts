import { Injectable } from '@nestjs/common'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { CreateUser } from '~features/user/application/create_user'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { AuthUserDto } from './auth_user_dto'

@Injectable()
export class RegisterAuthService {
	constructor( private readonly repo: AuthRepository,
		private readonly userRepo: UserDao )
	{}

	async register( dto: AuthUserDto,
		password: string
		// ): Promise<Auth> {
	): Promise<string> {

		/*const auth = await this.repo.register( email, password )*/
		const tempID = UUID.create()

		const user = await CreateUser( this.userRepo, {
			authId: tempID.value,
			rut   : dto.rut,
			name  : dto.name,
			email : dto.email,
			role  : dto.role
		} )
		return tempID.value
	}
}
