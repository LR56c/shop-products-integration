import { BaseException } from "../../shared/domain/exceptions/BaseException";
import { InvalidIntegerException } from "../../shared/domain/exceptions/InvalidIntegerException";
import { InvalidStringException } from "../../shared/domain/exceptions/InvalidStringException";
import { UUID } from "../../shared/domain/value_objects/UUID";
import { ValidDate } from "../../shared/domain/value_objects/ValidDate";
import { ValidString } from "../../shared/domain/value_objects/ValidString";
import { wrapType } from "../../shared/utils/WrapType";
import { Percentage } from "../domain/models/Percentage";
import { Sale } from "../domain/models/sale";
import { SaleRepository } from "../domain/repository/sale_repository";

export const CreateSale = async (repo : SaleRepository, props : {
    id : string
    percentage : number
    product_code : string
    creation_date : Date
    start_date : Date
    end_date : Date
}) : Promise<boolean> => {
    const errors : BaseException[] = []
    
    const porcentageResult = wrapType<Percentage, InvalidIntegerException>(
        () => Percentage.from( props.percentage ) )

    if ( porcentageResult instanceof BaseException ) {
        errors.push( new InvalidIntegerException( 'percentage' ) )
    }

    const product_codeResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( props.product_code ) )

    if ( product_codeResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'product_code' ) )
    }

    const creation_dateResult = wrapType<ValidDate, InvalidStringException>(
        () => ValidDate.from( props.creation_date ) )

    if ( creation_dateResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'creation_date' ) )
    }

    const start_dateResult = wrapType<ValidDate, InvalidStringException>(
        () => ValidDate.from( props.start_date ) )

    if ( start_dateResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'start_date' ) )
    }

    const end_dateResult = wrapType<ValidDate, InvalidStringException>(
        () => ValidDate.from( props.end_date ) )

    if ( end_dateResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'end_date' ) )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    const sale = new Sale(
        UUID.create(),
        porcentageResult as Percentage,
        product_codeResult as ValidString,
        creation_dateResult as ValidDate,
        start_dateResult as ValidDate,
        end_dateResult as ValidDate

    )

    return await repo.createSale( sale )
        
}