import {User} from "../domain/models/User";
import {UserDao} from "../domain/dao/UserDao";
import {wrapType} from "../../shared/utils/WrapType";
import {Role} from "../../shared/domain/value_objects/Role";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";

export const GetUser = async ( repo: UserDao, props: {
    role: string
    name: string
    from: string
    to: string
}): Promise<User[]> =>   {

    const errors : Error[] = []

    const roleResult = wrapType<Role, InvalidStringException>(
        () => Role.from( props.role ) )

    if ( roleResult instanceof Error ) {
        errors.push(new InvalidStringException('role'))
    }

    const nameResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( props.name ) )

    if ( nameResult instanceof Error ) {
        errors.push(new InvalidStringException('name'))
    }

    const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from( props.from ) )

    if ( fromResult instanceof Error ) {
        errors.push(new InvalidIntegerException('from'))
    }

    const toResult = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from( props.to ) )

    if ( toResult instanceof Error ) {
        errors.push(new InvalidIntegerException('to'))
    }

    if ( errors.length > 0 ) {
        throw errors
    }

  return await repo.getUser(
      roleResult as Role,
      nameResult as ValidString,
      fromResult as ValidInteger,
      toResult as ValidInteger)
}