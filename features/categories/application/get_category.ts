import {Category} from "../domain/category";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {CategoryRepository} from "../domain/category_repository";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {wrapType} from "../../shared/utils/WrapType";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";

export const GetCategory = async (
    repo: CategoryRepository,
    props: {
        from: number,
        to: number,
        name?: string
    }
): Promise<Category[]> => {


    const errors: BaseException[] = [];

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

    const name = props.name === undefined
        ? undefined
        : wrapType<ValidString, InvalidStringException>(
            () => ValidString.from( props.name ?? '' ) )

    if ( name != undefined && name instanceof
        BaseException )
    {
        errors.push( new InvalidStringException( 'name' ) )
    }

    if (errors.length > 0) {
        throw errors
    }

    return await repo.get(
        fromResult as ValidInteger,
        toResult as ValidInteger,
        name as ValidString
    )
}