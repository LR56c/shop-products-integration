import { Injectable } from '@nestjs/common'
import { LoginAuth } from '~features/auth/application/login_auth'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class LoginAuthService {
	constructor( private readonly repo: AuthRepository ) {}

	async login(
		email: string,
		password: string
	): Promise<Auth> {
		const result = await LoginAuth( this.repo, email, password )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
