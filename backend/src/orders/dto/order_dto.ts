import {
	IsArray,
	IsDate,
	IsEmail,
	IsOptional,
	IsUUID
} from 'class-validator'

export class OrderDto {
	@IsUUID()
	id: string

	@IsEmail()
	client_email: string

	@IsDate()
	creation_date: Date

	@IsUUID()
	payment_id: string

	@IsArray()
	@IsUUID( '4', {
		each: true
	} )
	products_ids: string[]

	@IsOptional()
	@IsEmail()
	seller_email: string

	@IsOptional()
	@IsUUID()
	order_confirmed: string

	@IsOptional()
	@IsUUID()
	item_confirmed: string
}

