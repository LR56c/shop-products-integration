import {PaymentRepository} from "../domain/repository/payment_repository";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {wrapType} from "../../shared/utils/WrapType";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {UUID} from "../../shared/domain/value_objects/UUID";

export const DeletePayment = async (
    repo: PaymentRepository,
    id: string): Promise<boolean> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(id)
    )

    if (idResult instanceof BaseException) {
        throw [new InvalidUUIDException('id')]
    }

    return await repo.deletePayment(idResult as UUID)
}