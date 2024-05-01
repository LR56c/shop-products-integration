import {
	IsEnum,
	IsInt,
	IsString,
	Min,
	MinLength
} from 'class-validator'
import { RoleEnum } from '~features/shared/domain/value_objects/Role'

export class GetUserDto {
	@IsEnum( RoleEnum )
	role: string

	@MinLength( 1 )
	@IsString()
	name: string

	@Min( 0 )
	@IsInt()
	from: string

	@Min( 0 )
	@IsInt()
	to: string
}
