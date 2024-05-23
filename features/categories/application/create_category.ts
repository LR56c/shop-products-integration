import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {CategoryRepository} from "../domain/category_repository";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {wrapType} from "../../shared/utils/WrapType";
import {Category} from "../domain/category";

export const CreateCategory = async (
    repo: CategoryRepository,
    props: {
        name: string
    }): Promise<boolean> => {

    const errors: BaseException[] = []

    const nameResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from(props.name))

    if (nameResult instanceof BaseException) {
        errors.push(new InvalidStringException('name'))
    }

    if (errors.length > 0) {
        throw errors
    }

    const c = new Category(
        nameResult as ValidString
    )

    await repo.save(c)
    return true
}