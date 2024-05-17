import {wrapType} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {CartRepository} from "../domain/cart_repository";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {UUID} from "../../shared/domain/value_objects/UUID";

export const DeleteCart = async (
    repo: CartRepository,
    email: string,
    product_id: string
): Promise<boolean> => {
    const emailResult = wrapType<Email, EmailException>(
        () => Email.from(email)
    )

    if (emailResult instanceof BaseException) {
        throw [new EmailException('email')]
    }

    const product_idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(product_id)
    )

    if (product_idResult instanceof BaseException) {
        throw [new InvalidUUIDException('product_id')]
    }


    return repo.remove(emailResult, product_idResult)
}
