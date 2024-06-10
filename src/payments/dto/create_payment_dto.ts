import { OmitType } from '@nestjs/mapped-types'
import { PaymentDto } from './payment_dto'

export class CreatePaymentDto extends OmitType( PaymentDto,
	[ 'creation_date', 'approved' ] )
{}
