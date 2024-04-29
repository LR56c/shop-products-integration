import {UserDao} from "../domain/dao/UserDao";
import {User} from "../domain/models/User";
import {wrapType} from "../../shared/utils/WrapType";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";

export const UpdateUser = async (repo: UserDao, props: {
    email: string,
    user: User
}): Promise<boolean> => {
    const errors: Error[] = []
    const emailResult = wrapType<Email, EmailException>(
        () => Email.from(props.email)
    )
    if (emailResult instanceof Error) {
        errors.push(new EmailException('email'))
    }
    if (errors.length > 0) {
        throw errors
    }
    return await repo.updateUser(emailResult as Email, props.user)
}