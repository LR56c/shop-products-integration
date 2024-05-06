import {
	IsDate,
	IsEmail,
	IsOptional,
	IsUUID
} from 'class-validator'

export class OrderConfirmedDto {
	@IsUUID()
	id: string
	@IsUUID()
	order_id: string
	@IsDate()
	creation_date: Date

	@IsOptional()
	@IsEmail()
	accountant_email?: string
}
