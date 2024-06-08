import {PaymentRepository} from "../domain/repository/payment_repository";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {
    wrapType,
    wrapTypeAsync
} from '../../shared/utils/wrap_type'
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {UUID} from '../../shared/domain/value_objects/uuid';

export const DeletePayment = async (
    repo: PaymentRepository,
    id: string): Promise<boolean | BaseException> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(id)
    )

    if (idResult instanceof BaseException) {
        return idResult
    }

    return await wrapTypeAsync(()=>repo.deletePayment(idResult as UUID))
}
