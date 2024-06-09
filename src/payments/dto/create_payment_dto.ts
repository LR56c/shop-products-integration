import { OmitType } from '@nestjs/mapped-types'
import { PaymentDto } from 'src/payments/dto/payment_dto'

export class CreatePaymentDto extends OmitType( PaymentDto,
	[ 'creation_date', 'approved' ] )
{}
