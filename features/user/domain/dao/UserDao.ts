import { Email } from '../../../shared/domain/value_objects/Email'
import { Role } from '../../../shared/domain/value_objects/Role'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { User } from '../models/User'

export abstract class UserDao {
	abstract createUser( user: User ): Promise<boolean>

	abstract getUser( from: ValidInteger, to: ValidInteger, role?: Role,
		name?: ValidString ): Promise<User[]>

	abstract getOneUser( email: Email ): Promise<User>

	abstract updateUser( email: Email, user: User ): Promise<boolean>

	abstract deleteUser( email: Email ): Promise<boolean>
}
