import { ItemConfirmed } from '../domain/item_confirmed'
import { ItemConfirmedRepository } from '../domain/item_confirmed_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

export const CreateItemConfirmed = async ( repo: ItemConfirmedRepository,
	props: {
		id?: string,
		creation_date: Date,
		shop_keeper_email?: string
}): Promise<boolean | Errors>=>{

	const errors : BaseException[] = []

	const id = wrapTypeDefault(
		UUID.create(),
		(value) => UUID.from( value ),
		props.id
	)

	if( id instanceof BaseException ) {
		errors.push( id )
	}

	const creationDateResult = wrapType( () => ValidDate.from( props.creation_date ) )

	if( creationDateResult instanceof BaseException ) {
		errors.push( creationDateResult )
	}

	const shopKeeperEmail = wrapTypeDefault(
		undefined,
		(value) => Email.from( value ),
		props.shop_keeper_email
	)

	if( shopKeeperEmail instanceof BaseException ) {
		errors.push( shopKeeperEmail )
	}

	if( errors.length > 0 ) {
		return new Errors( errors )
	}

	const i = new ItemConfirmed(
		id as UUID,
		creationDateResult as ValidDate,
		shopKeeperEmail as Email
	)

	return await wrapTypeErrors(()=> repo.create(i) )
}
