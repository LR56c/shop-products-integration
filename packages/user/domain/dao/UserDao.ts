import { Email } from '../../../shared/domain/value_objects/email'
import { Role } from '../../../shared/domain/value_objects/role'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { User } from '../models/User'

export abstract class UserDao {
	abstract createUser( user: User ): Promise<boolean>

	abstract getUser( from: ValidInteger, to: ValidInteger, role?: Role,
		name?: ValidString ): Promise<User[]>

	abstract getOneUser( email: Email ): Promise<User>

	abstract updateUser( email: Email, user: User ): Promise<boolean>

	abstract deleteUser( email: Email ): Promise<boolean>
}
