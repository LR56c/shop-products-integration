import {
	IsEmail,
	IsEnum,
	IsString,
	IsUUID,
	Matches,
	MinLength
} from 'class-validator'
import { RoleEnum } from '../../../packages/shared/domain/value_objects/role'

export class UserDto {

	@IsUUID()
	auth_id: string

	@Matches( /\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/ )
	@IsString()
	rut: string

	@MinLength( 1 )
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsEnum( RoleEnum )
	role: string

}
