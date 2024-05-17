import { Payment } from '~features/payments/domain/models/payment'
import { PaymentMethod } from '~features/payments/domain/models/payment_method'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '~features/shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidPaymentMethodException } from '~features/shared/domain/exceptions/InvalidPaymentMethodException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidBool } from '~features/shared/domain/value_objects/ValidBool'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { PaymentDto } from './payment_dto'


export function parsePayment( dto: PaymentDto ): Payment
{
	const errors: BaseException[] = []
	const id                      = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.id ) )
	if ( id instanceof InvalidUUIDException ) {
		errors.push( new InvalidUUIDException() )
	}
	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.created_at ) )
	if ( creationDate instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}
	const approved = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( dto.approved ) )
	if ( approved instanceof BaseException ) {
		errors.push( new InvalidBooleanException() )
	}
	const deliveryName = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( dto.delivery_address ) )
	if ( deliveryName instanceof BaseException ) {
		errors.push( new InvalidStringException() )
	}
	const paymentValue = wrapType<ValidInteger, InvalidStringException>(
		() => ValidInteger.from( dto.value ) )
	if ( paymentValue instanceof BaseException ) {
		errors.push( new InvalidStringException() )
	}
	const paymentMethod = wrapType<PaymentMethod, InvalidPaymentMethodException>(
		() => PaymentMethod.from( dto.payment_method ) )

	if ( paymentMethod instanceof BaseException ) {
		errors.push( new InvalidPaymentMethodException() )
	}

	if ( errors.length > 0 )
	{
		throw errors
	}

	return new Payment(
		id as UUID,
		creationDate as ValidDate,
		approved as ValidBool,
		deliveryName as ValidString,
		paymentValue as ValidInteger,
		paymentMethod as PaymentMethod
	)
}
