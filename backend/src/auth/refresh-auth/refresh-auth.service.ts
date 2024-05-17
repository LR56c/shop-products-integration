import { Injectable } from '@nestjs/common'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class RefreshAuthService {
	constructor( private readonly repo: AuthRepository ) {}

	async refresh( token: ValidString ): Promise<Auth> {
		return this.repo.recover( token )
	}
}
