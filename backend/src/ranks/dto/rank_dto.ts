import {
	IsDate,
	IsEmail,
	IsNumber,
	IsString,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class RankDto {
	@IsEmail()
	user_email: string

	@IsDate()
	created_at: Date

	@Max( 5 )
	@Min( 0 )
	@IsNumber()
	value: number

	@MinLength( 0 )
	@IsString()
	product_code: string

	@IsString()
	code: string

	@IsNumber()
	rank: number
}

