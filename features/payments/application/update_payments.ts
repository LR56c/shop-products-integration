import {PaymentRepository} from "../domain/repository/payment_repository";
import {wrapType} from "../../shared/utils/WrapType";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {ValidDate} from "../../shared/domain/value_objects/ValidDate";
import {InvalidDateException} from "../../shared/domain/exceptions/InvalidDateException";
import {ValidBool} from "../../shared/domain/value_objects/ValidBool";
import {InvalidBooleanException} from "../../shared/domain/exceptions/InvalidBooleanException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {PaymentMethod} from "../domain/models/payment_method";
import {InvalidPaymentMethodException} from "../../shared/domain/exceptions/InvalidPaymentMethodException";
import {Payment} from "../domain/models/payment";

export const UpdatePayment = async (
    repo: PaymentRepository,
    props: {
        id: string
        creationDate: string
        approved: boolean
        deliveryName: string
        paymentValue: number
        paymentMethod: string
    } ): Promise<boolean> => {

    const errors: BaseException[] = []

    const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from( props.id ) )

    if ( idResult instanceof BaseException ) {
        errors.push( new InvalidUUIDException( 'id' ) )
    }

    const creationDateResult = wrapType<ValidDate, InvalidDateException>(
        () => ValidDate.from( props.creationDate ) )

    if ( creationDateResult instanceof BaseException ) {
        errors.push( new InvalidDateException( 'creationDate' ) )
    }

    const approvedResult = wrapType<ValidBool, InvalidBooleanException>(
        () => ValidBool.from( props.approved ) )

    if ( approvedResult instanceof BaseException ) {
        errors.push( new InvalidBooleanException( 'approved' ) )
    }

    const deliveryNameResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( props.deliveryName ) )

    if ( deliveryNameResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'deliveryName' ) )
    }

    const paymentValueResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from( props.paymentValue ) )

    if ( paymentValueResult instanceof BaseException ) {
        errors.push( new InvalidIntegerException( 'paymentValue' ) )
    }

    const paymentMethodResult = wrapType<PaymentMethod, InvalidPaymentMethodException>(
        () => PaymentMethod.from( props.paymentMethod ) )

    if ( paymentMethodResult instanceof BaseException ) {
        errors.push( new InvalidPaymentMethodException( 'paymentMethod' ) )
    }

    if ( errors.length > 0 ) {
        throw errors
    }
    const p = new Payment(
        idResult as UUID,
        creationDateResult as ValidDate,
        approvedResult as ValidBool,
        deliveryNameResult as ValidString,
        paymentValueResult as ValidInteger,
        paymentMethodResult as PaymentMethod
    )
    await repo.updatePayment( p )
    return true
    }