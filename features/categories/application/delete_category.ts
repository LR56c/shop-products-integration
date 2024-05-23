import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {wrapType} from "../../shared/utils/WrapType";
import {CategoryRepository} from "../domain/category_repository";
import {Category} from "../domain/category";

export const DeleteCategory = async (
    repo: CategoryRepository,
    name: string
): Promise<boolean> => {

    const nameResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from(name)
    )

    if (nameResult instanceof BaseException) {
        throw [new InvalidStringException()]
    }

    const c = new Category(
        nameResult as ValidString
    )
    await repo.delete(c)
    return true
}