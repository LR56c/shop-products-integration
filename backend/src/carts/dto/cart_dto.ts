import {
	IsEmail,
	IsNumber,
	IsString,
	IsUUID,
	Min,
	MinLength
} from 'class-validator'

export class CartDto {
	@IsEmail()
	user_email : string

	@IsUUID()
	product_id : string

	@Min(1)
	@IsNumber()
	quantity : number
}
