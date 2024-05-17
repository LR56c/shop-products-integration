import {wrapType} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {NewsLetterRepository} from "../domain/news_letter_repository";

export const DeleteNewsLetter = async (
    repo: NewsLetterRepository,
    email: string): Promise<boolean> => {

    const emailResult = wrapType<Email, EmailException>(
        () => Email.from(email))

    if (emailResult instanceof BaseException) {
        throw [new EmailException()]
    }

    return repo.remove(emailResult)
}