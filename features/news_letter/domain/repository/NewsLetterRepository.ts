import { Email } from '../../../shared/domain/value_objects/Email'

export abstract class NewsLetterRepository {
	abstract add(email: Email): boolean
	abstract check(email: Email): boolean
	abstract remove(email: Email): boolean
	abstract getAll(): Email[]
}

