import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {OrderConfirmedRepository} from "../domain/order_confirmed_repository";
import {OrderConfirmed} from "../domain/order_confirmed";
import {wrapType} from "../../shared/utils/WrapType";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";

export const GetAllOrderConfirmed = async (
    repo: OrderConfirmedRepository,
    props: {
        from: number,
        to: number
    }): Promise<OrderConfirmed[]> => {

    const errors: BaseException[] = []

    const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from(props.from))


    if (fromResult instanceof BaseException) {
        errors.push(new InvalidIntegerException('from'))
    }

    const toResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from(props.to))

    if (toResult instanceof BaseException) {
        errors.push(new InvalidIntegerException('to'))
    }

    return repo.getAll(fromResult as ValidInteger, toResult as ValidInteger)
    }