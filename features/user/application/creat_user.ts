import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {RUT} from "../domain/models/RUT";
import {InvalidRUTException} from "../domain/exceptions/InvalidRUTException";
import {wrapType} from "../../shared/utils/WrapType";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {Role} from "../../shared/domain/value_objects/Role";
import {User} from "../domain/models/User";
import {UserDao} from "../domain/dao/UserDao";

export const CreateUser = async ( repo: UserDao, props: {
    rut: string
    name: string
    email: string
    role: string
} ): Promise<boolean> => {

    const errors: BaseException[] = []

    const rutResult = wrapType<RUT, InvalidRUTException>(
        () => RUT.from( props.rut ) )

    if ( rutResult instanceof BaseException ) {
        errors.push( new InvalidRUTException( 'rut' ) )
    }

    const nameResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( props.name ) )

    if ( nameResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'name' ) )
    }

    const emailResult = wrapType<Email, EmailException>(
        () => Email.from( props.email ) )

    if ( emailResult instanceof BaseException ) {
        errors.push( new EmailException( 'email' ) )
    }

    const roleResult = wrapType<Role, InvalidStringException>(
        () => Role.from( props.role ) )

    if ( roleResult instanceof BaseException ) {
        errors.push( new InvalidStringException( 'role' ) )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    const user = new User(
        rutResult as RUT,
        nameResult as ValidString,
        emailResult as RUT,
        roleResult as Role
    )
    return await repo.createUser( user as User )
}