import { NewsLetter } from '../models/NewsLetter'
import { Email } from '../../../shared/domain/value_objects/Email'

export abstract class NewsLetterRepository {
	abstract add(email: Email): Promise<boolean>
	abstract check(email: Email): Promise<boolean>
	abstract remove(email: Email): Promise<boolean>
	abstract getAll(): Promise<NewsLetter[]>
}

