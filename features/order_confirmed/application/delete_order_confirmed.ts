import {wrapType} from "../../shared/utils/WrapType";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {OrderConfirmedRepository} from "../domain/order_confirmed_repository";

export const DeleteOrderConfirmed = async (
    repo: OrderConfirmedRepository,
    id: string): Promise<boolean> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(id))

    if (idResult instanceof BaseException) {
        throw [new InvalidUUIDException('id')]
    }
    
    return repo.delete(idResult)

    }