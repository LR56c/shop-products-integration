import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export const GetAllNewsLetter = async (
	repo: NewsLetterRepository,
	props: {
		from: number,
		to: number,
		name?: string
	} ): Promise<NewsLetter[]> => {

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
		throw errors
	}

	return repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		name as ValidString )
}
