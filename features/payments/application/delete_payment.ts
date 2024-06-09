import { Errors } from '../../shared/domain/exceptions/errors'
import {PaymentRepository} from "../domain/repository/payment_repository";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {
    wrapType,
    wrapTypeErrors
} from '../../shared/utils/wrap_type'
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {UUID} from '../../shared/domain/value_objects/uuid';

export const DeletePayment = async (
    repo: PaymentRepository,
    id: string): Promise<boolean | Errors> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(id)
    )

    if (idResult instanceof BaseException) {
        return new Errors([idResult])
    }

    return await wrapTypeErrors(()=>repo.deletePayment(idResult as UUID))
}
