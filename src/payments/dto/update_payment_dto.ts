import { PartialType } from '@nestjs/mapped-types'
import { PaymentDto } from 'src/payments/dto/payment_dto'

export class UpdatePaymentDto extends PartialType( PaymentDto ) {
}
