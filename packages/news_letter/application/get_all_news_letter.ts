import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export const GetAllNewsLetter = async (
	repo: NewsLetterRepository,
	props: {
		from: number,
		to: number,
		name?: string
	} ): Promise<NewsLetter[] | Errors> => {

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

	const name = props.name === undefined
		? undefined
		: wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name ?? '' ) )

	if ( name != undefined && name instanceof
		BaseException )
	{
		errors.push( new InvalidStringException( 'name' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors( () => repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		name as ValidString )
	)
}
