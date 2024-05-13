import {
	IsString,
	IsUUID,
	MinLength
} from 'class-validator'

export class AuthDto{
	@IsUUID()
	id: string

	@MinLength(1)
	@IsString()
	token: string
}
