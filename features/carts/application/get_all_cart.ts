import {CartRepository} from "../domain/cart_repository";
import {CartResponse} from "../domain/cart_response";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {wrapType} from "../../shared/utils/WrapType";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {Email} from "../../shared/domain/value_objects/Email";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";

export const GetAllCart = async (
    repo: CartRepository,
    props:{
        from: number,
        to: number,
        user_email?: string
    } ): Promise<CartResponse[]> => {

    const errors: BaseException[] = []

    const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from( props.from ) )

    if ( fromResult instanceof BaseException ) {
        errors.push( new InvalidIntegerException( 'from' ) )
    }

    const toResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from( props.to ) )

    if ( toResult instanceof BaseException ) {
        errors.push( new InvalidIntegerException( 'to' ) )
    }

    const user_email = props.user_email === undefined
        ? undefined
        : wrapType<Email, EmailException>(
            () => Email.from( props.user_email ?? '' ) )

    if ( user_email != undefined && user_email instanceof
        BaseException )
    {
        errors.push( new InvalidStringException( 'user_email' ) )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    return repo.getAll(
        fromResult as ValidInteger,
        toResult as ValidInteger,
        user_email as Email)
}
