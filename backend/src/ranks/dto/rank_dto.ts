import {
	IsDate,
	IsDecimal,
	IsEmail,
	IsNumber,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class RankDto {
	@IsUUID()
	id: string

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
}

