import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { Auth } from './auth'
import { Email } from '../../shared/domain/value_objects/email'
import { Password } from '../../user/domain/models/Password'

export abstract class AuthRepository {
	abstract register( email: Email, password: Password ): Promise<Auth>

	abstract login( email: Email, password: Password ): Promise<Auth>

	abstract recover( token: ValidString ): Promise<Auth>
}
