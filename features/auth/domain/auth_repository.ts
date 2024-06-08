import { Email } from '../../shared/domain/value_objects/Email'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Password } from '../../user/domain/models/Password'
import { Auth } from './auth'

export abstract class AuthRepository {
	abstract register( email: Email, password: Password ): Promise<Auth>

	abstract login( email: Email, password: Password ): Promise<Auth>

	abstract recover( token: ValidString ): Promise<Auth>
}
