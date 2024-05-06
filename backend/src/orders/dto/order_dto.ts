import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsUUID
} from 'class-validator'

export class OrderDto{
	@IsUUID()
	id : string

	@IsEmail()
	seller_email : string

	@IsEmail()
	client_email : string

	@IsDate()
	creation_date : Date

	@IsBoolean()
	approved : boolean

	@IsUUID()
	payment_id : string
}
