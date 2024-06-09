import { Injectable } from '@nestjs/common'
import { RecoverAuth } from '~features/auth/application/recover_auth'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class RefreshAuthService {
	constructor( private readonly repo: AuthRepository ) {}

	async refresh( token: string ): Promise<Auth> {
		const result = await RecoverAuth( this.repo, token )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
