import { Email } from '../../shared/domain/value_objects/email'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { NewsLetter } from './news_letter'

export abstract class NewsLetterRepository {
	abstract add( newsLetter: NewsLetter ): Promise<boolean>

	abstract checkByEmail( email: Email ): Promise<boolean>

	abstract remove( email: Email ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ): Promise<NewsLetter[]>
}

