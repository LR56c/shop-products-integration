import { FakerEmailMother } from './faker/faker_email_mother'
import { Email } from '~features/shared/domain/value_objects/email'

export class EmailMother {
	static random(): Email {
		return Email.from(FakerEmailMother.random())
	}

	static invalid(): Email {
		return Email.from('')
	}
}
