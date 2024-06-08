import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeAsync
} from '../../shared/utils/wrap_type'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export const DeleteNewsLetter = async (
	repo: NewsLetterRepository,
	email: string ): Promise<boolean | BaseException> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof BaseException ) {
		return new EmailException()
	}

	return await wrapTypeAsync(()=>repo.remove( emailResult ))

}
