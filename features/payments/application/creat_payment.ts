import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidPaymentMethodException } from '../../shared/domain/exceptions/InvalidPaymentMethodException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidBool } from '../../shared/domain/value_objects/ValidBool'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { Payment } from '../domain/models/payment'
import { PaymentMethod } from '../domain/models/payment_method'

export const CreatePayment = async ( props: {
	id: string,
	creationDate: Date,
	approved: boolean,
	deliveryName: string,
	paymentValue: number,
	paymentMethod: string
} ): Promise<Payment> => {
	const errors: BaseException[] = []
	const idResult                = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.id ) )
	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}
	const creationDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.creationDate ) )
	if ( creationDateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'creationDate' ) )
	}
	const approvedResult = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( props.approved ) )
	if ( approvedResult instanceof BaseException ) {
		errors.push( new InvalidBooleanException( 'approved' ) )
	}
	const deliveryNameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.deliveryName ) )
	if ( deliveryNameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'deliveryName' ) )
	}
	const paymentValueResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.paymentValue ) )
	if ( paymentValueResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'paymentValue' ) )
	}
	const paymentMethodResult = wrapType<PaymentMethod, InvalidPaymentMethodException>(
		() => PaymentMethod.from( props.paymentMethod ) )
	if ( paymentMethodResult instanceof BaseException ) {
		errors.push( new InvalidPaymentMethodException( 'paymentMethod' ) )
	}
	if ( errors.length > 0 ) {
		throw errors
	}
	return new Payment(
		idResult as UUID,
		creationDateResult as ValidDate,
		approvedResult as ValidBool,
		deliveryNameResult as ValidString,
		paymentValueResult as ValidInteger,
		paymentMethodResult as PaymentMethod
	)
}
