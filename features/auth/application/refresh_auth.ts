import {AuthRepository} from "../domain/auth_repository";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {Auth} from "../domain/auth";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {wrapType} from "../../shared/utils/WrapType";

export const RefreshAuth = async (
    repo: AuthRepository,
    props: {
        token: string
    } ): Promise<Auth> => {

    const errors: BaseException[] = []

    const tokenResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from(props.token))

    if (tokenResult instanceof BaseException) {
        errors.push(new InvalidStringException('token'))
    }

    if (errors.length > 0) {
        throw errors
    }

    return repo.recover(tokenResult as ValidString)
}