import {PaymentRepository} from "../domain/repository/payment_repository";
import {Payment} from "../domain/models/payment";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {wrapType} from "../../shared/utils/WrapType";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {BaseException} from "../../shared/domain/exceptions/BaseException";

export const GetPayment = async (
    repo: PaymentRepository,
    id: string ): Promise<Payment> => {

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from( id ) )

    if ( idResult instanceof BaseException ) {
        throw [ new InvalidUUIDException( 'id' ) ]
    }

    return repo.getPayment( idResult )
}