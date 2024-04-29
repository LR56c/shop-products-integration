import {User} from "../domain/models/User";
import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {InvalidRUTException} from "../domain/exceptions/InvalidRUTException";
import {RUT} from "../domain/models/RUT";
import {wrapType} from "../../shared/utils/WrapType";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {Email} from "../../shared/domain/value_objects/Email";
import {EmailException} from "../../shared/domain/exceptions/EmailException";
import {Role} from "../../shared/domain/value_objects/Role";

export function userToJson(user: User): Record<string, any> {
  return {
    rut: user.rut.value,
    name: user.name.value,
    email: user.email.value,
    role: user.role.value,
  };
}
export function userFromJson(json: Record<string, any>): User | BaseException[] {
    const errors: BaseException[] = []

    const rut = wrapType<RUT, InvalidRUTException>(
        () => RUT.from( json.rut ) )
    if ( rut instanceof BaseException ) {
        errors.push( new InvalidRUTException('rut') )
    }
    const name = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( json.name ) )
    if ( name instanceof BaseException ) {
        errors.push( new InvalidStringException('name') )
    }

    const email = wrapType<Email, EmailException>(
        () => Email.from( json.email ) )
    if ( email instanceof BaseException ) {
        errors.push( new EmailException('email') )
    }

    const role = wrapType<Role, InvalidStringException>(
        () => Role.from( json.role ) )
    if ( role instanceof BaseException ) {
        errors.push( new InvalidStringException('role') )
    }

    if ( errors.length > 0 ) {
        throw errors
    }

    return new User(
        rut as RUT,
        name as ValidString,
        email as Email,
        role as Role)
}