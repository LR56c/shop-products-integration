import {AuthRepository} from "../domain/auth_repository";
import {Auth} from "../domain/auth";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {wrapType} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {Password} from "../../user/domain/models/Password";
import {InvalidPasswordException} from "../../user/domain/exceptions/PasswordException";

export const LoginAuth = async (
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

    const  PasswordResult = wrapType<Password, InvalidPasswordException>(
        () => Password.from(props.password))

    if (PasswordResult instanceof BaseException) {
        errors.push(new InvalidPasswordException('password'))
    }

    if (errors.length > 0) {
        throw errors
    }

    return repo.login(emailResult)
}
