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
	creationDate: string

	@IsBoolean()
	approved: boolean

	@MinLength( 1 )
	@IsString()
	deliveryName: string

	@Min( 1 )
	@IsInt()
	paymentValue: number

	@MinLength( 1 )
	@IsString()
	paymentMethod: string

}
