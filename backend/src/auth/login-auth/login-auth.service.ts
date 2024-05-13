import {
	Injectable,
	Post
} from '@nestjs/common'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { Password } from '~features/user/domain/models/Password'

@Injectable()
export class LoginAuthService {
	constructor( private readonly repo: AuthRepository ) {}

	async login(
		email: Email,
		password: Password
	): Promise<Auth> {
		return this.repo.login( email, password )
	}
}
