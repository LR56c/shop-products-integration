import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidBool } from '../../shared/domain/value_objects/valid_bool'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { Payment } from '../domain/models/payment'
import { PaymentRepository } from '../domain/repository/payment_repository'

export const GetAllPayments = async (
	repo: PaymentRepository,
	props: {
		from: number
		to: number
		approved?: boolean
		from_date?: string
		to_date?: string
	} ): Promise<Payment[] | Errors> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'from' ) )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'to' ) )
	}

	const approvedResult = wrapTypeDefault(
		undefined,
		( value ) => ValidBool.from( value ),
		props.approved
	)

	if ( approvedResult instanceof BaseException ) {
		errors.push( new InvalidBooleanException( 'approved' ) )
	}

	const fromDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
		props.from_date
	)

	if ( fromDateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'from_date' ) )
	}

	const toDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
		props.to_date
	)

	if ( toDateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'to_date' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(
		() => repo.getAllPayment(
			fromResult as ValidInteger,
			toResult as ValidInteger,
			approvedResult as ValidBool | undefined,
			fromDateResult as ValidDate | undefined,
			toDateResult as ValidDate | undefined )
	)
}
