import {wrapType} from "../../shared/utils/WrapType";
import {UserDao} from "../domain/dao/UserDao";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";

export const DeleteUser = async ( repo: UserDao, props: {
    email: string
} ): Promise<boolean> => {
    const errors: Error[] = []

    const emailResult = wrapType<Email, EmailException>(
        () => Email.from( props.email ) )

    if ( emailResult instanceof Error ) {
        errors.push( new EmailException( 'email' ) )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    return await repo.deleteUser( emailResult as Email )
}