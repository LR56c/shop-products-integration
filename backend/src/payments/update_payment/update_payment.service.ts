import { Injectable } from '@nestjs/common'
import { UpdatePaymentDto } from 'src/payments/dto/update_payment_dto'
import { GetPayment } from '~features/payments/application/get_payment'
import { UpdatePayment } from '~features/payments/application/update_payments'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class UpdatePaymentService {
	constructor( private repository: PaymentRepository ) {}

	async updatePayment(id : string, props: UpdatePaymentDto ): Promise<boolean> {
		const savedPayment = await GetPayment( this.repository, id )

		if( savedPayment instanceof Errors ) {
			throw [ ...savedPayment.values]
		}

		const result =  await UpdatePayment( this.repository, savedPayment,{
			id           : props.id,
			creation_date : props.creation_date,
			approved     : props.approved,
			delivery_name : props.delivery_name,
			payment_value : props.payment_value,
			payment_method: props.payment_method
		} )

		if( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
