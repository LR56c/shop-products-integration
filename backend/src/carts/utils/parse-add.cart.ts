import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { wrapType } from '~features/shared/utils/WrapType'

export function parseAddCart( dto: {
	user_email: string,
	product_id: string,
	quantity: number,
} ): {
	data: {
		user_email: Email,
		product_id: UUID,
		quantity: ValidInteger,
	}
}
{
	const errors: BaseException[] = []

	const user_email = wrapType<Email, EmailException>(
		() => Email.from( dto.user_email ?? '' ) )

	if ( user_email instanceof EmailException ) {
		errors.push( new EmailException() )
	}

	const product_id = wrapType<UUID, BaseException>(
		() => UUID.from( dto.product_id ) )

	if ( product_id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const quantity = wrapType<ValidInteger, BaseException>(
		() => ValidInteger.from( dto.quantity ) )

	if ( quantity instanceof BaseException ) {
		errors.push( new InvalidIntegerException() )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return {
		data: {
			user_email: user_email as Email,
			product_id: product_id as UUID,
			quantity  : quantity as ValidInteger
		}
	}
}
