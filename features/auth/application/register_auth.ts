import {AuthRepository} from "../domain/auth_repository";
import {Auth} from "../domain/auth";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {wrapType, wrapTypes} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {Password} from "../../user/domain/models/Password";
import {InvalidPasswordException} from "../../user/domain/exceptions/PasswordException";

export const RegisterAuth = async (
    repo: AuthRepository,
    props: {
        email: string,
        password: string
    } ): Promise<Auth> => {

    const errors: BaseException[] = []

    const emailResult = wrapType<Email, EmailException>(
        () => Email.from(props.email))

    if (emailResult instanceof BaseException) {
        errors.push(new EmailException('email'))
    }

    const passwordResult = wrapTypes<Password, InvalidPasswordException>(
        () => Password.from(props.password))

    if (passwordResult instanceof BaseException) {
        errors.push(passwordResult)
    }

    if (errors.length > 0) {
        throw errors
    }

    return repo.register(emailResult as Email, passwordResult as Password)
}