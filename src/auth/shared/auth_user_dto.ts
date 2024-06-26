import {
	IsEmail,
	IsEnum,
	IsString,
	Matches,
	MinLength
} from 'class-validator'
import { RoleEnum } from '../../../packages/shared/domain/value_objects/role'

export class AuthUserDto {
	@IsEmail()
	email: string

	@IsEnum( RoleEnum )
	role: string

	@Matches( /\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/ )
	@IsString()
	rut: string

	@MinLength( 1 )
	@IsString()
	name: string
}
