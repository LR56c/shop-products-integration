import { Injectable } from '@nestjs/common';
import {UserDao} from "~features/user/domain/dao/UserDao";
import {User} from "~features/user/domain/models/User";
import {UpdateUser} from "~features/user/application/update_user";

@Injectable()
export class UpdateUserService {
    constructor( private repository : UserDao) {}
    async updateUser(email: string, user: User): Promise<boolean> {
        return UpdateUser(this.repository, {
            email: email,
            user: user
        })
    }
}
