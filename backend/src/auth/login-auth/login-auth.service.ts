import { Injectable } from '@nestjs/common';
import { AuthRepository } from '~features/auth/domain/auth_repository'

@Injectable()
export class LoginAuthService {
	constructor(private readonly repo : AuthRepository) {}
}
