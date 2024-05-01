import {
	IsEmail,
	IsEnum,
	IsString,
	Matches,
	MinLength
} from 'class-validator'
import { RoleEnum } from '~features/shared/domain/value_objects/Role'

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsEnum(RoleEnum)
	role: string

	@Matches( /\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/ )
	@IsString()
	rut: string

	@MinLength( 1 )
	@IsString()
	name: string
}
