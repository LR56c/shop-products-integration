import { Injectable } from '@nestjs/common';
import { Email } from '~features/shared/domain/value_objects/Email'
import {UserDao} from "~features/user/domain/dao/UserDao";
import {User} from "~features/user/domain/models/User";

@Injectable()
export class UpdateUserService {
    constructor( private repository : UserDao) {}
    async updateUser(email: Email, user: User): Promise<boolean> {
        return this.repository.updateUser(email, user)
    }
}
