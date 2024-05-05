import { ValidString } from 'features/shared/domain/value_objects/ValidString'
import { NewsLetter } from './news_letter'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export abstract class NewsLetterRepository {
	abstract add(newsLetter : NewsLetter): Promise<boolean>
	abstract checkByEmail(email: Email): Promise<boolean>
	abstract remove(email: Email): Promise<boolean>
	abstract getAll(from : ValidInteger, to : ValidInteger, name ?: ValidString): Promise<NewsLetter[]>
}

