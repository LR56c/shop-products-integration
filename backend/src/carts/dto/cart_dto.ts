import {
	IsEmail,
	IsNumber,
	IsUUID,
	Min,
} from 'class-validator'

export class CartDto {
	@IsEmail()
	user_email : string

	@IsUUID()
	product_id : string

	@IsNumber()
	quantity : number
}
