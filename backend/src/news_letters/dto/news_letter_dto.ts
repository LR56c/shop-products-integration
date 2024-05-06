import {
	IsDate,
	IsEmail,
	IsString,
	MinLength
} from 'class-validator'

export class NewsLetterDto{
	@IsEmail()
	email: string

	@MinLength( 1 )
	@IsString()
	name: string

	@IsDate()
	created_at: Date
}
