import { Injectable } from '@nestjs/common'
import { Auth } from '~features/auth/domain/auth'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import {RefreshAuth} from "~features/auth/application/refresh_auth";

@Injectable()
export class RefreshAuthService {
	constructor( private readonly repo: AuthRepository ) {}

	async refresh( token: string ): Promise<Auth> {
		return RefreshAuth( this.repo, { token: token } )
	}
}
