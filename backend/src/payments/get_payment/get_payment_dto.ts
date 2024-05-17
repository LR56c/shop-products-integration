import { IsUUID } from 'class-validator'

export class GetPaymentDto {
	@IsUUID()
	id: string
}
