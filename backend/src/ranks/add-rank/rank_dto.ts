import {
	IsDate,
	IsDecimal,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class RankDto {
	@IsUUID()
	id: string

	@IsDate()
	created_at: Date

	@Max( 5 )
	@Min( 0 )
	@IsDecimal()
	value: number

	@MinLength( 0 )
	@IsString()
	code: string
}

