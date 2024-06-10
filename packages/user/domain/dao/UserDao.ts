import { Email } from '../../../shared/domain/value_objects/email'
import { Role } from '../../../shared/domain/value_objects/role'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { User } from '../models/User'

export abstract class UserDao {
	abstract create( user: User ): Promise<boolean>

	abstract get( from: ValidInteger, to: ValidInteger, role?: Role,
		name?: ValidString ): Promise<User[]>

	abstract getOne( email: Email ): Promise<User>

	abstract update( email: Email, user: User ): Promise<boolean>

	abstract delete( email: Email ): Promise<boolean>
}
