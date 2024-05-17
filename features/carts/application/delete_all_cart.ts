import {CartRepository} from "../domain/cart_repository";
import {wrapType} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";

export const DeleteAllCart = async (
    repo: CartRepository,
    email: string
): Promise<boolean> => {
    const emailResult = wrapType<Email, EmailException>(
        () => Email.from(email)
    )

    if (emailResult instanceof BaseException) {
        throw [new EmailException('email')]
    }

    return repo.removeAll(emailResult)
}