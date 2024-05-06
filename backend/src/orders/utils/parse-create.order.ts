import { OrderDto } from 'src/orders/dto/order_dto'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidBooleanException } from '~features/shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidBool } from '~features/shared/domain/value_objects/ValidBool'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { wrapType } from '~features/shared/utils/WrapType'

export function parseCreateOrder( dto: OrderDto ): {
	data: {
		id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID,
	}
}
{
	const errors: BaseException[] = []

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.id ) )

	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'order_id' ) )
	}

	const seller_email = wrapType<Email, EmailException>(
		() => Email.from( dto.seller_email ) )

	if ( seller_email instanceof BaseException ) {
		errors.push( new EmailException( 'seller_email' ) )
	}

	const client_email = wrapType<Email, EmailException>(
		() => Email.from( dto.client_email ) )

	if ( client_email instanceof BaseException ) {
		errors.push( new EmailException( 'client_email' ) )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.creation_date ) )

	if ( creation_date instanceof BaseException ) {

		errors.push( new InvalidDateException( 'creation_date' ) )
	}

	const approved = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( dto.approved ) )

	if ( approved instanceof BaseException ) {

		errors.push( new InvalidBooleanException( 'approved' ) )
	}

	const payment = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.payment_id ) )

	if ( payment instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'payment_id' ) )
	}


	if ( errors.length > 0 ) {
		throw errors
	}

	return {
		data: {
			id           : idResult as UUID,
			seller_email : seller_email as Email,
			client_email : client_email as Email,
			creation_date: creation_date as ValidDate,
			approved     : approved as ValidBool,
			payment_id   : payment as UUID
		}
	}
}
