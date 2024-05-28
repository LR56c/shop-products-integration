import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {wrapType} from "../../shared/utils/WrapType";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {Payment} from "../domain/models/payment";
import {PaymentRepository} from "../domain/repository/payment_repository";
import {InvalidBooleanException} from "../../shared/domain/exceptions/InvalidBooleanException";
import {ValidBool} from "../../shared/domain/value_objects/ValidBool";
import {ValidDate} from "../../shared/domain/value_objects/ValidDate";
import {InvalidDateException} from "../../shared/domain/exceptions/InvalidDateException";

export const GetAllPayments = async (
    repo: PaymentRepository,
    props: {
        from: number
        to: number
        approved?: boolean
        from_date?: string
        to_date?: string
    }): Promise<Payment[]> => {

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

    const approvedResult = props.approved === undefined
        ? undefined
        : wrapType<ValidBool, InvalidBooleanException>(
            () => ValidBool.from(props.approved ?? false) )

    if ( approvedResult instanceof BaseException ) {
        errors.push( new InvalidBooleanException('approved') )
    }

    const fromDateResult = props.from_date === undefined
        ? undefined
        : wrapType<ValidDate, InvalidDateException>(
            () => ValidDate.from(props.from_date ?? '') )

    if ( fromDateResult instanceof BaseException ) {
        errors.push( new InvalidDateException('from_date') )
    }

    const toDateResult = props.to_date === undefined
        ? undefined
        : wrapType<ValidDate, InvalidDateException>(
            () => ValidDate.from(props.to_date ?? '') )

    if ( toDateResult instanceof BaseException ) {
        errors.push( new InvalidDateException('to_date') )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    return repo.getAllPayment( fromResult as ValidInteger, toResult as ValidInteger,
        approvedResult as ValidBool, fromDateResult as ValidDate, toDateResult as ValidDate )
}