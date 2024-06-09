import { Injectable } from '@nestjs/common'
import { DeleteAuth } from 'packages/auth/application/delete_auth'
import { RegisterAuth } from 'packages/auth/application/register_auth'
import { Auth } from 'packages/auth/domain/auth'
import { AuthRepository } from 'packages/auth/domain/auth_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { CreateUser } from 'packages/user/application/create_user'
import { UserDao } from 'packages/user/domain/dao/UserDao'
import { AuthUserDto } from 'src/auth/shared/auth_user_dto'

@Injectable()
export class RegisterAuthService {
	constructor( private readonly repo: AuthRepository,
		private readonly userRepo: UserDao )
	{}

	async register( dto: AuthUserDto,
		password: string
	): Promise<Auth> {

		const auth = await RegisterAuth( this.repo, dto.email, password )

		if ( auth instanceof Errors ) {
			throw [ ...auth.values ]
		}
		const user = await CreateUser( this.userRepo, {
			authId: auth.id.value,
			rut   : dto.rut,
			name  : dto.name,
			email : dto.email,
			role  : dto.role
		} )

		if ( user instanceof Errors ) {
			await DeleteAuth( this.repo, auth.id.value )
			throw [ ...user.values ]
		}

		return auth
	}
}
