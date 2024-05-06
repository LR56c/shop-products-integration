import {
	IsDate,
	IsEmail,
	IsOptional,
	IsUUID
} from 'class-validator'

export class ItemConfirmedDto {
	@IsUUID()
	id: string

	@IsUUID()
	order_id: string

	@IsDate()
	creation_date: Date

	@IsOptional()
	@IsEmail()
	shop_keeper_email: string
}
