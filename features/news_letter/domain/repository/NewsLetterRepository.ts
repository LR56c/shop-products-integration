import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { NewsLetter } from '../models/NewsLetter'
import { Email } from '../../../shared/domain/value_objects/Email'

export abstract class NewsLetterRepository {
	abstract add(email: Email, name : ValidString): Promise<boolean>
	abstract check(email: Email): Promise<boolean>
	abstract remove(email: Email): Promise<boolean>
	abstract getAll(limit : ValidInteger): Promise<NewsLetter[]>
}

