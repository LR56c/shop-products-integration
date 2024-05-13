import { Injectable } from '@nestjs/common'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { Role } from '~features/shared/domain/value_objects/Role'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { Password } from '~features/user/domain/models/Password'
import { RUT } from '~features/user/domain/models/RUT'
import { User } from '~features/user/domain/models/User'

@Injectable()
export class RegisterAuthService {
	constructor( private readonly repo: AuthRepository,
		private readonly userRepo: UserDao )
	{}

	async register( email: Email, password: Password,
		rut: RUT,
		name: ValidString,
		role: Role
	// ): Promise<Auth> {
	): Promise<string> {

		// const auth = await this.repo.register( email, password )
		const tempID = UUID.create()

		await this.userRepo.createUser( new User(
			// auth.id,
			tempID,
			rut,
			name,
			email,
			role
		) )
		return tempID.value
	}
}
