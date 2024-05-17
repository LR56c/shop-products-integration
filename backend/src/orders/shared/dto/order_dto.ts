import { Type } from 'class-transformer'
import {
	IsDate,
	IsEmail,
	IsNumber,
	IsOptional,
	IsUUID,
	Min,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsUUID()
	id: string

	@IsEmail()
	client_email: string

	@IsDate()
	creation_date: Date

	@IsUUID()
	payment_id: string

	@ValidateNested()
	@Type( () => OrderProductDto )
	products: OrderProductDto[]

	@IsOptional()
	@IsEmail()
	seller_email: string

	@IsOptional()
	@IsUUID()
	order_confirmed_id: string

	@IsOptional()
	@IsUUID()
	item_confirmed_id: string
}

export class OrderProductDto {
	@IsUUID()
	product_id: string

	@Min( 1 )
	@IsNumber()
	quantity: number
}
