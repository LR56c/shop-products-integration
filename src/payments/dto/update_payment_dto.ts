import { PartialType } from '@nestjs/mapped-types'
import { PaymentDto } from './payment_dto'

export class UpdatePaymentDto extends PartialType( PaymentDto ) {
}
