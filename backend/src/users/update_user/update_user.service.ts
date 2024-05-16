import { Injectable } from '@nestjs/common';
import { Email } from '~features/shared/domain/value_objects/Email'
import {UserDao} from "~features/user/domain/dao/UserDao";
import {User} from "~features/user/domain/models/User";
import {UpdateUser} from "~features/user/application/update_user";
import {PartialUserDto} from "../shared/partial_user_dto";
import {wrapType} from "~features/shared/utils/WrapType";
import {EmailException} from "~features/shared/domain/exceptions/EmailException";

@Injectable()
export class UpdateUserService {
    constructor( private repository : UserDao) {}

    async updateUser(email: string, user: PartialUserDto): Promise<boolean> {

        const emailResult = wrapType<Email, EmailException>(
            () => Email.from(email))

        if ( emailResult instanceof EmailException ) {
            throw [ new EmailException( 'email' ) ]
        }

        const userSaved = await this.repository.getOneUser( emailResult as Email )

        return UpdateUser(this.repository,  userSaved, {
            rut: user.rut,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
}
