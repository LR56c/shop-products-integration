import { Injectable } from '@nestjs/common';
import { Email } from '~features/shared/domain/value_objects/Email'
import {UserDao} from "~features/user/domain/dao/UserDao";

@Injectable()
export class DeleteUserService {
    constructor( private repository: UserDao ) {
    }
    async deleteUser(email: Email): Promise<boolean> {
        return this.repository.deleteUser(email)
    }
}
