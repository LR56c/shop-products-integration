import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidBool } from '../../shared/domain/value_objects/valid_bool'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidPaymentMethodException } from '../../shared/domain/exceptions/InvalidPaymentMethodException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Payment } from '../domain/models/payment'
import { PaymentMethod } from '../domain/models/payment_method'
import { PaymentRepository } from '../domain/repository/payment_repository'

export const CreatePayment = async (
	repo: PaymentRepository,
	props: {
		id?: string,
		delivery_ame: string,
		payment_value: number,
		payment_method: string
	} ): Promise<Payment | Errors> => {
	const errors: BaseException[] = []

	const idResult = wrapTypeDefault(
		UUID.create(),
		( value ) => UUID.from( value ),
		props.id )

	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}

	const creationDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date() ) )

	if ( creationDateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'creation_date' ) )
	}

	const approvedResult = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( false ) )

	if ( approvedResult instanceof BaseException ) {
		errors.push( new InvalidBooleanException( 'approved' ) )
	}

	const deliveryNameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.delivery_ame ) )

	if ( deliveryNameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'delivery_name' ) )
	}

	const paymentValueResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.payment_value ) )

	if ( paymentValueResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'payment_value' ) )
	}

	const paymentMethodResult = wrapType<PaymentMethod, InvalidPaymentMethodException>(
		() => PaymentMethod.from( props.payment_method ) )

	if ( paymentMethodResult instanceof BaseException ) {
		errors.push( new InvalidPaymentMethodException( 'payment_method' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}
	const p      = new Payment(
		idResult as UUID,
		creationDateResult as ValidDate,
		approvedResult as ValidBool,
		deliveryNameResult as ValidString,
		paymentValueResult as ValidInteger,
		paymentMethodResult as PaymentMethod
	)
	const result = await wrapTypeErrors( () => repo.createPayment( p ) )

	if ( result instanceof Errors ) {
		return result
	}
	return p
}
