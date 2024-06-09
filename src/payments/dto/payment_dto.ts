import {
	IsBoolean,
	IsDate,
	IsInt,
	IsString,
	IsUUID,
	Min,
	MinLength
} from 'class-validator'

export class PaymentDto {
	@IsUUID()
	id: string

	@IsDate()
	creation_date: string

	@IsBoolean()
	approved: boolean

	@MinLength( 1 )
	@IsString()
	delivery_name: string

	@Min( 1 )
	@IsInt()
	payment_value: number

	@MinLength( 1 )
	@IsString()
	payment_method: string

}
