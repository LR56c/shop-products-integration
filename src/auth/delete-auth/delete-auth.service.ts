import { Injectable } from '@nestjs/common'
import { DeleteAuth } from '../../../packages/auth/application/delete_auth'
import { AuthRepository } from '../../../packages/auth/domain/auth_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteAuthService {

	constructor( private readonly repo: AuthRepository ) {}

	async execute( email: string ): Promise<boolean> {
		const result = await DeleteAuth( this.repo, email )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
