import {
	IsString,
	IsUUID,
	MinLength
} from 'class-validator'

export class UserDto {

	@IsUUID()
	auth_id: string

	@IsString()
	rut: string

	@MinLength( 1 )
	@IsString()
	name: string

	@IsString()
	email: string

	@IsString()
	role: string

}
