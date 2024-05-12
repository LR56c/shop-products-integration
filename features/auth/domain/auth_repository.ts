import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Auth } from './auth'
import { Email } from '../../shared/domain/value_objects/Email'
import { Password } from '../../user/domain/models/Password'

export abstract class AuthRepository {
	abstract register( email: Email, password: Password ): Promise<Auth>

	abstract login( email: Email, password: Password ): Promise<Auth>

	abstract recover( token: ValidString ): Promise<Auth>

	abstract logout(): Promise<boolean>
}
