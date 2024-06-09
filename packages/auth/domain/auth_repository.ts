import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { Email } from '../../shared/domain/value_objects/email'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { Password } from '../../user/domain/models/Password'
import { Auth } from './auth'

export abstract class AuthRepository {
	abstract register( email: Email, password: Password ): Promise<Auth>

	abstract login( email: Email, password: Password ): Promise<Auth>

	abstract recover( token: ValidString ): Promise<Auth>

	abstract delete( id: UUID ): Promise<boolean>
}
